using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FeedMe.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FeedMe.API.Controllers
{
	//https://www.getpostman.com/collections/c22f6bb7bd3bc4335317
    [Route("api/[controller]")]
    [ApiController]
    public class DefaultController : ControllerBase
    {
		private static List<string> ValueList = new List<string>() {  "value1", "value2" };
		private readonly IUserRepository _test;
		public DefaultController(IUserRepository test)
		{
			_test = test;
		}
        // GET: api/Default
        [HttpGet]
        public IActionResult Get()
        {
			var t = _test.Select();
            var result = ValueList;
			return Ok(result);
        }

		// GET: api/Default/value1
		[HttpGet("{id}", Name = "Get")]
		public IActionResult Get(string id)
		{
			var result =  ValueList.FirstOrDefault(q=> q == id);
			return Ok(result);
		}

        // POST: api/Default
        [HttpPost]
        public IActionResult Post([FromBody] string value)
        {
			ValueList.Add(value);
			var url = Url.Link("Get", new {Controller = "Default", Action="GET", id = value});
			return Ok(url);
        }

        // PUT: api/Default/5
        [HttpPut("{oldValue}")]
        public IActionResult Put(string oldValue, [FromBody] string newValue)
        {
			int index = ValueList.FindIndex(n => n == oldValue);
			if(index > -1)
			{
				ValueList[index] = newValue;	
			}
				
			var url = Url.Link("Get", new {Controller = "Default", Action="GET", id = newValue});
			return Ok(url); 
        }

		// DELETE: api/ApiWithActions/5
		[HttpDelete("{value}")]
		public IActionResult Delete(string value)
		{
			int index = ValueList.FindIndex(n => n == value);
			if(index > -1)
			{
				ValueList.RemoveAt(index);
			}

			return Ok();
		}
    }
}
