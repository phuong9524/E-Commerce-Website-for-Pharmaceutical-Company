using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Medicine.Domain.Extensions
{
    public static class StringExtension
    {
        public static string Base64Encode(string plainText)
        {
            if(string.IsNullOrEmpty(plainText)) 
                return plainText;

            var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
            return Convert.ToBase64String(plainTextBytes);
        }

        public static string Base64Decode(string base64EncodedData)
        {
            if (string.IsNullOrEmpty(base64EncodedData))
                return base64EncodedData;

            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
            return Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}
