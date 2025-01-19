using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.DataHelpers;
using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe.Climate;
using VNPAY.NET.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace API.Controllers
{
    public class BookingsController(IUnitOfWork unit, IVnPayService vnPayService, IMapper mapper) : BaseApiController
    {
        [Authorize]

        [HttpPost]
        public async Task<ActionResult<string>> CreateBooking(Booking booking)
        {
            unit.Repository<Booking>().Add(booking);
            if (await unit.Complete())
            {
                if(booking.PaymentType == "2")
                {
                    
                    return Ok(new { paymentUrl = "", id = booking.Id });
                }
                var paymentUrl = vnPayService.CreatePaymentUrl(booking);
                return Ok(new { paymentUrl = paymentUrl, id = booking.Id });
                //return CreatedAtAction("CreateBooking", new { id = booking.Id }, booking);
            }
            return BadRequest("Failed to create booking");
        }
        [Authorize]

        [HttpGet("{bookingId}")]
        public async Task<ActionResult<Booking>> GetBooking(int bookingId)
        {
            var spec = new BookingWithTourSpecification(bookingId);
            var booking = await unit.Repository<Booking>().GetEntityWithSpec(spec);
            if (booking == null) return NotFound();
            return Ok(mapper.Map<Booking, BookingDto>(booking));
        }


        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Booking>>> GetAllBooking([FromQuery] string sort, [FromQuery] string order, [FromQuery] int page, [FromQuery] string? date, [FromQuery] string? search, [FromQuery] string? departureDate)
        {
            var spec = new BookingWithTourSpecification(sort, order, page, date, search, departureDate);
            var items = await unit.Repository<Booking>().ListAsyncWithSpec(spec);
            var count = await unit.Repository<Booking>().CountAsync(spec);
            var data = mapper.Map<IReadOnlyList<Booking>, IReadOnlyList<BookingDto>>(items);
            var pagination = new Pagination<BookingDto>(page, 10, count, data);
            return Ok(pagination);
        }

        [HttpGet("booking-for-user")]
        public async Task<ActionResult<IReadOnlyList<Booking>>> GetALlBookingForUser([FromQuery] string sort, [FromQuery] string order, [FromQuery] int page, [FromQuery] string uid)
        {
            var spec = new BookingForUserSpecification(sort, order, page, Convert.ToInt32(uid));
            var items = await unit.Repository<Booking>().ListAsyncWithSpec(spec);
            var count = await unit.Repository<Booking>().CountAsync(spec);
            var data = mapper.Map<IReadOnlyList<Booking>, IReadOnlyList<BookingDto>>(items);
            var pagination = new Pagination<BookingDto>(page, 10, count, data);
            return Ok(pagination);
        }

        [HttpPost("update-result")]
        public async Task<ActionResult<PaymentResponseModel>> UpdateBookingResult([FromQuery] string? vnp_Amount, [FromQuery] string? vnp_BankCode
          , [FromQuery] string? vnp_BankTranNo, [FromQuery] string? vnp_CardType, [FromQuery] string? vnp_OrderInfo, [FromQuery] string? vnp_PayDate
            , [FromQuery] string? vnp_ResponseCode, [FromQuery] string? vnp_TmnCode, [FromQuery] string? vnp_TransactionNo
            , [FromQuery] string? vnp_TransactionStatus, [FromQuery] string? vnp_TxnRef, [FromQuery] string? vnp_SecureHash)
        {
            var response = await vnPayService.GetCheckoutResult();
            return response;
        }


        [HttpGet("all-booking-for-recommendation")]
        public async Task<ActionResult<IReadOnlyList<Booking>>> GetALlBookingForRecommendation( [FromQuery] string uid)
        {
            var spec = new BookingForUserSpecification(Convert.ToInt32(uid));
            var items = await unit.Repository<Booking>().ListAsyncWithSpec(spec);
            return Ok(items);
            //var count = await unit.Repository<Booking>().CountAsync(spec);
            //var data = mapper.Map<IReadOnlyList<Booking>, IReadOnlyList<BookingDto>>(items);
            //var pagination = new Pagination<BookingDto>(page, 10, count, data);
            //return Ok(pagination);
        }
    }
}