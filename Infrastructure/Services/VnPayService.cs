using API.Libraries;
using Azure;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Infrastructure.Services
{
    public class VnPayService : IVnPayService
    {

        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUnitOfWork _unit;
        private readonly IEmailService _emailService;
        public VnPayService(IConfiguration config, IHttpContextAccessor httpContextAccessor,IUnitOfWork unit,IEmailService emailService)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _unit = unit;
            _emailService = emailService;
        }
        public string CreatePaymentUrl(Booking booking)
        {

            //Get Config Info
            //Get Config Info
            string vnp_Returnurl = _config["Vnpay:vnp_Returnurl"]; //URL nhan ket qua tra ve 
            string vnp_Url = _config["Vnpay:BaseUrl"]; //URL thanh toan cua VNPAY 
            string vnp_TmnCode = _config["Vnpay:TmnCode"]; //Ma định danh merchant kết nối (Terminal Id)
            string vnp_HashSecret = _config["Vnpay:HashSecret"]; //Secret Key

            //Get payment input
            //OrderInfo order = new OrderInfo();
            //order.OrderId = DateTime.Now.Ticks; // Giả lập mã giao dịch hệ thống merchant gửi sang VNPAY
            //order.Amount = 100000; // Giả lập số tiền thanh toán hệ thống merchant gửi sang VNPAY 100,000 VND
            //order.Status = "0"; //0: Trạng thái thanh toán "chờ thanh toán" hoặc "Pending" khởi tạo giao dịch chưa có IPN
            //order.CreatedDate = DateTime.Now;
            //Save order to db

            //Build URL for VNPAY
            VnPayLibrary vnpay = new VnPayLibrary();
            //booking.PaymentMethodType = "2";
            vnpay.AddRequestData("vnp_Version", VnPayLibrary.VERSION);
            vnpay.AddRequestData("vnp_Command", "pay");
            vnpay.AddRequestData("vnp_TmnCode", vnp_TmnCode);
            vnpay.AddRequestData("vnp_Amount", (booking.PricePerAdult * booking.NumAdults  * 100 + booking.PricePerChild * booking.NumChildren * 100).ToString()); //Số tiền thanh toán. Số tiền không mang các ký tự phân tách thập phân, phần nghìn, ký tự tiền tệ. Để gửi số tiền thanh toán là 100,000 VND (một trăm nghìn VNĐ) thì merchant cần nhân thêm 100 lần (khử phần thập phân), sau đó gửi sang VNPAY là: 10000000
            //if (bankcode_Vnpayqr.Checked == true)
            //{
            //    vnpay.AddRequestData("vnp_BankCode", "VNPAYQR");
            //}
            //else if (bankcode_Vnbank.Checked == true)
            //{
            //    vnpay.AddRequestData("vnp_BankCode", "VNBANK");
            //}
            //else if (bankcode_Intcard.Checked == true)
            //{
            //    vnpay.AddRequestData("vnp_BankCode", "INTCARD");
            //}

            if (booking.PaymentMethodType == "1")
            {
                vnpay.AddRequestData("vnp_BankCode", "VNPAYQR");
            }
            else if (booking.PaymentMethodType == "2")
            {
                vnpay.AddRequestData("vnp_BankCode", "VNBANK");
            }
            else if (booking.PaymentMethodType == "3")
            {
                vnpay.AddRequestData("vnp_BankCode", "INTCARD");
            }
            vnpay.AddRequestData("vnp_CreateDate", booking.CreateDate.HasValue
        ? booking.CreateDate.Value.ToString("yyyyMMddHHmmss")
        : DateTime.Now.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", "VND");
            vnpay.AddRequestData("vnp_IpAddr", Utils.GetIpAddress(_httpContextAccessor.HttpContext));
            vnpay.AddRequestData("vnp_Locale", "vn");

            //if (locale_Vn.Checked == true)
            //{
            //    vnpay.AddRequestData("vnp_Locale", "vn");
            //}
            //else if (locale_En.Checked == true)
            //{
            //    vnpay.AddRequestData("vnp_Locale", "en");
            //}
            //vnpay.AddRequestData("vnp_OrderInfo", "Thanh toan don hang:" + order.OrderId);
            vnpay.AddRequestData("vnp_OrderType", "other"); //default value: other
            vnpay.AddRequestData("vnp_OrderInfo", "Thanh toan don hang:" + booking.Id);

            vnpay.AddRequestData("vnp_ReturnUrl", vnp_Returnurl);
            //vnpay.AddRequestData("vnp_TxnRef", order.OrderId.ToString()); // Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày
            vnpay.AddRequestData("vnp_TxnRef", booking.Id.ToString()); // Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày

            //Add Params of 2.1.0 Version
            //Billing

            string paymentUrl = vnpay.CreateRequestUrl(vnp_Url, vnp_HashSecret);
            //log.InfoFormat("VNPAY URL: {0}", paymentUrl);
            //Response.Redirect(paymentUrl);
            return paymentUrl;
        }

        public async Task<PaymentResponseModel> GetCheckoutResult()
        {
            PaymentResponseModel response = new PaymentResponseModel();
            var request = _httpContextAccessor.HttpContext.Request;
            if (request.QueryString.HasValue)
            {
                string vnp_HashSecret = _config["Vnpay:HashSecret"]; //Chuoi bi mat
                var vnpayData = request.Query;
                VnPayLibrary vnpay = new VnPayLibrary();

                foreach (var key in vnpayData.Keys)
                {
                    // Get all query string data starting with "vnp_"
                    if (!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
                    {
                        vnpay.AddResponseData(key, vnpayData[key]);
                    }
                }
                //foreach (string s in vnpayData)
                //{
                //    //get all querystring data
                //    if (!string.IsNullOrEmpty(s) && s.StartsWith("vnp_"))
                //    {
                //        vnpay.AddResponseData(s, vnpayData[s]);
                //    }
                //}
                //vnp_TxnRef: Ma don hang merchant gui VNPAY tai command=pay    
                //vnp_TransactionNo: Ma GD tai he thong VNPAY
                //vnp_ResponseCode:Response code from VNPAY: 00: Thanh cong, Khac 00: Xem tai lieu
                //vnp_SecureHash: HmacSHA512 cua du lieu tra ve

                long orderId = Convert.ToInt64(vnpay.GetResponseData("vnp_TxnRef"));
                long vnpayTranId = Convert.ToInt64(vnpay.GetResponseData("vnp_TransactionNo"));
                string vnp_ResponseCode = vnpay.GetResponseData("vnp_ResponseCode");
                string vnp_TransactionStatus = vnpay.GetResponseData("vnp_TransactionStatus");
                string vnp_SecureHash = request.Query["vnp_SecureHash"];
                string TerminalID = request.Query["vnp_TmnCode"];
                long vnp_Amount = Convert.ToInt64(vnpay.GetResponseData("vnp_Amount")) / 100;
                string bankCode = request.Query["vnp_BankCode"];

                bool checkSignature = vnpay.ValidateSignature(vnp_SecureHash, vnp_HashSecret);
                int bookingId = Convert.ToInt32(orderId);
                var spec = new BookingSpecification(bookingId);
                var booking = await _unit.Repository<Booking>().GetEntityWithSpec(spec);
                //var booking = await this.unit.Repository<Booking>().GetByIdAsync(bookingId);

                if (checkSignature)
                {
                    if (vnp_ResponseCode == "00" && vnp_TransactionStatus == "00")
                    {
                        //Thanh toan thanh cong
                        response.Description = "Giao dịch được thực hiện thành công. Cảm ơn quý khách đã sử dụng dịch vụ";
                        //log.InfoFormat("Thanh toan thanh cong, OrderId={0}, VNPAY TranId={1}", orderId, vnpayTranId);
                        response.VnPayResponseCode = "00";
                        booking.PaymentStatus = "1"; // Thành công
                        response.Booking = booking;
                        //this._emailService.SendEmailAsync(booking.Email, "Thanh toán thành công", "Test body");
                    }
                    else if(vnp_ResponseCode == "07")
                    {
                        //Thanh toan khong thanh cong. Ma loi: vnp_ResponseCode
                        //displayMsg.InnerText = "Có lỗi xảy ra trong quá trình xử lý.Mã lỗi: " + vnp_ResponseCode;
                        response.VnPayResponseCode = vnp_ResponseCode;
                        response.Description = "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).";
                        booking.PaymentStatus = "2"; // Thất bại 

                        //log.InfoFormat("Thanh toan loi, OrderId={0}, VNPAY TranId={1},ResponseCode={2}", orderId, vnpayTranId, vnp_ResponseCode);
                    }
                    else if (vnp_ResponseCode == "09")
                    {
                        response.VnPayResponseCode = vnp_ResponseCode;
                        response.Description = "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.";
                        booking.PaymentStatus = "2"; // Thất bại 
                    }
                    else if (vnp_ResponseCode == "10")
                    {
                        response.VnPayResponseCode = vnp_ResponseCode;
                        response.Description = "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần";
                        booking.PaymentStatus = "2"; // Thất bại 
                    }
                    else if(vnp_ResponseCode == "11")
                    {
                        response.VnPayResponseCode = vnp_ResponseCode;
                        response.Description = "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.";
                        booking.PaymentStatus = "2"; // Thất bại 
                    }
                    else if(vnp_ResponseCode == "12")
                    {
                        response.VnPayResponseCode = vnp_ResponseCode;
                        response.Description = "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.";
                        booking.PaymentStatus = "2"; // Thất bại 
                    }
                    else if (vnp_ResponseCode == "13")
                    {
                        response.VnPayResponseCode = vnp_ResponseCode;
                        response.Description = "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.";
                        booking.PaymentStatus = "2"; // Thất bại 
                    }
                    else if (vnp_ResponseCode == "24")
                    {
                        response.VnPayResponseCode = vnp_ResponseCode;
                        response.Description = "Giao dịch không thành công do: Khách hàng hủy giao dịch";
                        booking.PaymentStatus = "2"; // Thất bại 
                    }
                    else if (vnp_ResponseCode == "51")
                    {
                        response.VnPayResponseCode = vnp_ResponseCode;
                        response.Description = "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.";
                        booking.PaymentStatus = "2"; // Thất bại 
                    }
                    else if (vnp_ResponseCode == "75")
                    {
                        response.VnPayResponseCode = vnp_ResponseCode;
                        response.Description = "Ngân hàng thanh toán đang bảo trì.";
                        booking.PaymentStatus = "2"; // Thất bại 
                    }
                    else if (vnp_ResponseCode == "79")
                    {
                        response.VnPayResponseCode = vnp_ResponseCode;
                        response.Description = "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch";
                        booking.PaymentStatus = "2"; // Thất bại 
                    }
                    else if (vnp_ResponseCode == "99")
                    {
                        response.VnPayResponseCode = vnp_ResponseCode;
                        response.Description = "Giao dịch không thành công";
                        booking.PaymentStatus = "2"; // Thất bại 
                    }
                    else 
                    {
                        response.VnPayResponseCode = vnp_ResponseCode;
                        response.Description = "Giao dịch không thành công ";
                        booking.PaymentStatus = "2"; // Thất bại 
                    }
                    response.TerminalId = TerminalID;
                    response.OrderId= orderId.ToString();
                    response.TransactionId= vnpayTranId.ToString();
                    response.Amount= vnp_Amount;
                    response.BankCode = bankCode;
                    //displayTmnCode.InnerText = "Mã Website (Terminal ID):" + TerminalID;
                    //displayTxnRef.InnerText = "Mã giao dịch thanh toán:" + orderId.ToString();
                    //displayVnpayTranNo.InnerText = "Mã giao dịch tại VNPAY:" + vnpayTranId.ToString();
                    //displayAmount.InnerText = "Số tiền thanh toán (VND):" + vnp_Amount.ToString();
                    //displayBankCode.InnerText = "Ngân hàng thanh toán:" + bankCode;
                }
                else
                {
                    //log.InfoFormat("Invalid signature, InputData={0}", Request.RawUrl);
                    //displayMsg.InnerText = "Có lỗi xảy ra trong quá trình xử lý";
                    response.Description = "Có lỗi xảy ra trong quá trình xử lý";
                    response.VnPayResponseCode = "99";
                    booking.PaymentStatus = "2";
                }
                this._unit.Repository<Booking>().Update(booking);
                response.Booking = booking;
                await _unit.Complete();
            }
            return response;
        }
    }
}
