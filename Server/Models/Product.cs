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

    public bool Status { get; set; }

    public string? ImageUrl { get; set; }

    public virtual Category? Category { get; set; }

    public virtual ICollection<ProductOption> ProductOptions { get; set; } = new List<ProductOption>();

    public virtual ICollection<ProductReview> ProductReviews { get; set; } = new List<ProductReview>();

    public virtual Supplier? Supplier { get; set; }

    public virtual ICollection<Variant> Variants { get; set; } = new List<Variant>();
}
