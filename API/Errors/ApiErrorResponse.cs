using System;

namespace API.Errors;

public class ApiErrorResponse(int statusCode,string message,string ?details) : ApiResponse(statusCode,message)
{
    public string? Details { get; set; } = details;
}
