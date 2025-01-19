using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;

namespace Infrastructure.Services
{
    public class EmailService(IConfiguration config) : IEmailService
    {
        public void SendEmailAsync(string email, string subject, string body)
        {

            var client = new SmtpClient(config["Smtp:Host"], Convert.ToInt32(config["Smtp:Port"]))
            {
                Credentials = new NetworkCredential(config["Smtp:Username"], config["Smtp:Password"]),
                EnableSsl = true
            };
            client.Send("nghia.nd205008@gmail.com", email, subject, body);
            System.Console.WriteLine("Sent");
        }
    }
}
