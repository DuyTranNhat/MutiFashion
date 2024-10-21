using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Variant
{
    public int VariantId { get; set; }

    public int ProductId { get; set; }

    public string SkuId { get; set; } = null!;

    public int Quantity { get; set; }

    public bool Status { get; set; }

    public decimal SalePrice { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Image> Images { get; set; } = new List<Image>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<VariantValue> VariantValues { get; set; } = new List<VariantValue>();
}
