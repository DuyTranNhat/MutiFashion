using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class CampaignVariant
{
    public int CampaignVariantId { get; set; }

    public int CampaignId { get; set; }

    public int ProductId { get; set; }

    public decimal DiscountPercentage { get; set; }

    public virtual MarketingCampaign Campaign { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
