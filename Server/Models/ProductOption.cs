using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class ProductOption
{
    public int ProductId { get; set; }

    public int OptionId { get; set; }

    public virtual Option Option { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;

    public virtual ICollection<VariantValue> VariantValues { get; set; } = new List<VariantValue>();
}
