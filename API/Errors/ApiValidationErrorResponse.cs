using System;

namespace API.Errors;

public class ApiValidationErrorResponse() : ApiResponse(400)
{
    public IEnumerable<string> Errors { get; set; }
}
