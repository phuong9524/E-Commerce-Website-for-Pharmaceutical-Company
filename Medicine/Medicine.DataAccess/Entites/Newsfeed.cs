﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medicine.DataAccess.Entites
{
    public class Newsfeed : BaseEntity
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string Image { get; set; }

        public Guid UserId { get; set; }

        public virtual User User { get; set; }
    }
}
