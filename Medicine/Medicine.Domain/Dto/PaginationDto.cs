﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medicine.Domain.Dto
{
    public class PaginationDto<T>
    {
        public int TotalCount { get; set; }

        public int TotalPages { get; set; }

        public int CurrentPage { get; set; }

        public int PageSize { get; set; }

        public IList<T> Items { get; set; }

        public bool HasPreviousPage { get; set; }

        public bool HasNextPage { get; set;}
    }
}
