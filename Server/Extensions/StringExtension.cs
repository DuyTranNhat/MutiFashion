using System.Globalization;
using System.Text;

namespace Server.Extensions
{
    public static class StringExtension
    {
        public static string RemoveVietnameseDiacritics(this string text)
        {
            if (string.IsNullOrEmpty(text)) return text;
            text = text.Normalize(NormalizationForm.FormD);

            char[] chars = text
                .Where(c => CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                .ToArray();

            return new string(chars).Normalize(NormalizationForm.FormC);
        }
    }
}
