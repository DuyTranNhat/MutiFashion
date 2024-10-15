using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Value
{
    public int ValueId { get; set; }

    public int OptionId { get; set; }

    public string Value1 { get; set; } = null!;

    public virtual Option Option { get; set; } = null!;

    public virtual ICollection<VariantValue> VariantValues { get; set; } = new List<VariantValue>();
}
