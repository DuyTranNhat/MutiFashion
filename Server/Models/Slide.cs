using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Slide
{
    public int SlideId { get; set; }

    public string Title { get; set; } = null!;

    public string? Link { get; set; }

    public string? Image { get; set; }

    public bool Status { get; set; }

    public string? Description { get; set; }
}
