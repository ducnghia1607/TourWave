using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace Infrastructure.Services
{
    public class PaymentService(IConfiguration config,IUnitOfWork unit) : IPaymentService
    {
        async Task<Booking> IPaymentService.CreateOrUpdatePaymentIntent(int bookingId)
        {
            StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];
            //Check lại thông tin giá cả của tour
            var spec = new BookingWithTourSpecification(bookingId);
            var booking = await unit.Repository<Booking>().GetEntityWithSpec(spec);
            var schedule = await unit.Repository<Schedule>().GetByIdAsync(booking.ScheduleId);
            var tour = await unit.Repository<Tour>().GetByIdAsync(booking.TourId);
            if(tour.PriceAdult != booking.PricePerAdult){
                booking.PricePerAdult = tour.PriceAdult;
            }
            if(tour.PriceChild != booking.PricePerChild){
                booking.PricePerChild = tour.PriceChild;
            }
            if(booking.DepartureDate != schedule.DepartureDate){
                booking.DepartureDate = schedule.DepartureDate;
            }
            if(booking.ReturnDate != schedule.ReturnDate){
                booking.ReturnDate = schedule.ReturnDate;
            }
            var paymentIntentService = new PaymentIntentService();
            PaymentIntent intent;
            if(string.IsNullOrEmpty(booking.PaymentIntentId)){
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)(booking.PricePerAdult * booking.NumAdults + booking.PricePerChild  * booking.NumChildren),
                    Currency = "vnd",
                    PaymentMethodTypes = ["card"]
                };
                intent = await paymentIntentService.CreateAsync(options);
                booking.PaymentIntentId = intent.Id;
                booking.ClientSecret = intent.ClientSecret;
            }else{
                 var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long)(booking.PricePerAdult  * booking.NumAdults + booking.PricePerChild   * booking.NumChildren),
                };
                intent = await paymentIntentService.UpdateAsync(booking.PaymentIntentId,options);
                booking.PaymentIntentId = intent.Id;
                booking.ClientSecret = intent.ClientSecret;
            }
            return booking;
        }
    }
}