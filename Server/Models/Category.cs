using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string Name { get; set; } = null!;

    public bool? ActiveStatus { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
