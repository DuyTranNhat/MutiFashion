using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class MarketingCampaign
{
    public int CampaignId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public bool Status { get; set; }

    public virtual ICollection<CampaignVariant> CampaignVariants { get; set; } = new List<CampaignVariant>();
}
