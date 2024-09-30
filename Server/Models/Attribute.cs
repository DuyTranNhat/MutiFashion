using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Attribute
{
    public int AttributeId { get; set; }

    public string Name { get; set; } = null!;

    public bool Status { get; set; }

    public virtual ICollection<Value> Values { get; set; } = new List<Value>();

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
