﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class CloudinarySettings
    {
        public required string CloudName { get; set; }
        public required string ApiKey { get; set; }
        public required string ApiSecret { get; set; }
    }
}
