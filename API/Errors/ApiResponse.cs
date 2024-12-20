using System;

namespace API.Errors;

public class ApiResponse(int statusCode,string messages = null) 
{
    private static string GetFaultResponseMessages(int statusCode)
    {
        return statusCode switch{
            400 => "A bad request, you have made",
            401 => "Authorized, you are not ",
            404 => "Resource found,it was not ",
            500 => "Server errors are occured",
            _ => ""
        };
    }

    public int StatusCode { get; set; } = statusCode;

    public string Messages {get;set;} = messages ?? GetFaultResponseMessages(statusCode) ;
}
