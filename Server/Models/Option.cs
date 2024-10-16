using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Option
{
    public int OptionId { get; set; }

    public string Name { get; set; } = null!;

    public bool? ActiveStatus { get; set; }

    public virtual ICollection<ProductOption> ProductOptions { get; set; } = new List<ProductOption>();

    public virtual ICollection<Value> Values { get; set; } = new List<Value>();
}
