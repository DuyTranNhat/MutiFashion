using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public int? CategoryId { get; set; }

    public int? SupplierId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<CampaignVariant> CampaignVariants { get; set; } = new List<CampaignVariant>();

    public virtual Category? Category { get; set; }

    public virtual ICollection<ProductReview> ProductReviews { get; set; } = new List<ProductReview>();

    public virtual Supplier? Supplier { get; set; }

    public virtual ICollection<Variant> Variants { get; set; } = new List<Variant>();

    public virtual ICollection<Attribute> Attributes { get; set; } = new List<Attribute>();
}
