using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class StringUtility
    {
        private static readonly string[] VietnameseSigns = new string[]
{
  "aAeEoOuUiIdDyY",
  "áàạảãâấầậẩẫăắằặẳẵ",
  "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",
  "éèẹẻẽêếềệểễ",
  "ÉÈẸẺẼÊẾỀỆỂỄ",
  "óòọỏõôốồộổỗơớờợởỡ",
  "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",
  "úùụủũưứừựửữ",
  "ÚÙỤỦŨƯỨỪỰỬỮ",
  "íìịỉĩ",
  "ÍÌỊỈĨ",
  "đ",
  "Đ",
  "ýỳỵỷỹ",
  "ÝỲỴỶỸ"
};

        public static string RemoveSign4VietnameseString(string str)
        {

            //Tiến hành thay thế , lọc bỏ dấu cho chuỗi
            for (int i = 1; i < VietnameseSigns.Length; i++)
            {
                for (int j = 0; j < VietnameseSigns[i].Length; j++)
                    str = str.Replace(VietnameseSigns[i][j], VietnameseSigns[0][i - 1]);
            }

            string result = Regex.Replace(str, @"[^a-zA-Z0-9\s]", "");

            result = Regex.Replace(result, @"\s+", "-");

            result = result.Trim('-');

            result = result.ToLower();
            return result;
        }

        public static string RemoveVietnameseSign(string vietnamString)
        {
            Regex regex = new Regex(@"\p{IsCombiningDiacriticalMarks}+");
            string strFormD = vietnamString.Normalize(System.Text.NormalizationForm.FormD);
            string str = regex.Replace(strFormD, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
            string result = Regex.Replace(str, @"[^a-zA-Z0-9\s]", "");

            result = Regex.Replace(result, @"\s+", "-");

            result = result.Trim('-');

            result = result.ToLower();
            return result;
        }
    }
}
