namespace Server.Dtos.Chart
{
    public class GetListVariantChart
    {
        public int id {  get; set; }
        public string name { get; set; }
        public string supplierName { get; set; }
        public double salePrice { get; set; }
        public int  totalQuantity {get; set; }

    }
}
