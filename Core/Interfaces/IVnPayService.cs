using Core.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IVnPayService
    {
        string CreatePaymentUrl(Booking booking);
        //PaymentResponseModel PaymentExecute(IQueryCollection collections);
        Task<PaymentResponseModel> GetCheckoutResult();

    }
}
