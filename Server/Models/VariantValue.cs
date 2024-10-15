using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class VariantValue
{
    public int ProductId { get; set; }

    public int VariantId { get; set; }

    public int OptionId { get; set; }

    public int ValueId { get; set; }

    public virtual ProductOption ProductOption { get; set; } = null!;

    public virtual Value Value { get; set; } = null!;

    public virtual Variant Variant { get; set; } = null!;
}
