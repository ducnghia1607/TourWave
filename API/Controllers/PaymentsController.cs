using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class PaymentsController(IPaymentService paymentService) : BaseApiController
    {
        [Authorize]
        [HttpPost("{bookingId}")]
        public async Task<ActionResult<Booking>> CreateOrUpdatePaymentIntent(int bookingId)
        {
            var booking = await paymentService.CreateOrUpdatePaymentIntent(bookingId);
            if (booking == null) return BadRequest("Failed to create or update payment intent");
            return booking;
        }
    }
}