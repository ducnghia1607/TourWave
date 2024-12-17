using System;

namespace Core.Specifications;

public class TourSpecParams
{
    private const int MaxPageSize = 40;
    public int PageIndex = 1;
    private int _pageSize = 3;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
    }
    
    private List<string> _departure = [];
    public List<string> Departure
    {
        get { return _departure; }
        set { _departure = value.SelectMany(x => x.Split(',',StringSplitOptions.RemoveEmptyEntries)).ToList(); }
    }
    
    public string? Sort { get; set; }
    
    private string? _search;
    public string? Search
    {
        get => _search ?? "";
        set => _search = value.ToLower();
    }
    
}
