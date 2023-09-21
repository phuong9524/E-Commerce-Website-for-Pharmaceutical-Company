using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medicine.Domain.Dto.CommentDto
{
    public class CommentModifyDto
    {
        public Guid Id { get; set; }

        public string Content { get; set; }

        public float Points { get; set; }

        public Guid UserId { get; set; }

        public Guid ProductId { get; set; }
    }
}
