using System;

namespace Core.Specifications;

public class TourSpecParams
{
    private const int MaxPageSize = 40;
    private int _pageIndex = 1;

    public int PageIndex
    {
        get { return _pageIndex ; }
        set { _pageIndex  = value; }
    }

    private int _pageSize = 8;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
    }
    
    private string _departure = "";
    public string Departure
    {
        get { return _departure; }
        set => _departure = value;
        //set { _departure = value.SelectMany(x => x.Split(',',StringSplitOptions.RemoveEmptyEntries)).ToList(); }
    }
    
    public string? Sort { get; set; }
    
    private string? _search;
    public string? Search
    {
        get => _search ?? "";
        set => _search = value.ToLower();
    }

    private string? _date; // departure date
    public string? Date
    {
        get => this._date;
        set => _date = (DateOnly.Parse(value) < new DateOnly() || value == "")  ? new DateOnly().ToString() : value;
    }

    private string? _filterByPrice = "";
    public string? FilterByPrice
    {
        get { return _filterByPrice; }
        set { _filterByPrice = value; }
    }
    
}
