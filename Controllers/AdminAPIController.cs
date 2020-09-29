using System;
using Microsoft.AspNetCore.Mvc;
using InventorySystem.Controllers;
using System.Linq;
using InventorySystem.Models;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;

namespace InventorySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    { 
       [HttpPost("AddProduct")]
        public ActionResult<Product> AddProduct(string name, string quantity, string isDiscontinued)
        {
            ActionResult<Product> response;
            Product created;
            try
            {
                // We aren't concerned with validation here. Only in BLL.
                created = new AdminBLLController().CreateProduct(name, quantity, isDiscontinued);
                // Encode our created object as JSON and bounce it back with the request.
                response = Ok(created);
            }
            catch (InvalidOperationException)
            {
                response = StatusCode(403, new { error = $"Please provide a product name to add." });
            }
            catch (Exception e)
            {
                response = StatusCode(403, new { error = e.Message }); ;
            }

            // Return the response.
            return response;
        }


        [HttpPut("DiscontinueProduct")]
        public ActionResult<Product> DiscontinueProduct(string id)
        {
            ActionResult<Product> response;
            Product modified;
            try
            {
                // We aren't concerned with validation here. Only in BLL.
                modified = new AdminBLLController().DiscontinueProductByID(id);
                // Encode our created object as JSON and bounce it back with the request.
                response = Ok(modified);
            }
            catch (InvalidOperationException)
            {
                response = StatusCode(403, new { error = $"No product was found with the ID of {id}." });
            }
            catch (Exception e)
            {
                response = StatusCode(403, new { error = e.Message }); ;
            }

            // Return the response.
            return response;
        }

        [HttpPut("AddQuantityProduct")]
        public ActionResult<Product> AddQuantityProduct(string id, string amount)
        {
            ActionResult<Product> response;
            Product modified;
            try
            {
                // We aren't concerned with validation here. Only in BLL.
                modified = new AdminBLLController().AddQuantityToProductByID(id, amount);
                // Encode our created object as JSON and bounce it back with the request.
                response = Ok(modified);
            }
            catch (InvalidOperationException)
            {
                response = StatusCode(403, new { error = $"No product was found with the ID of {id}." });
            }
            catch (Exception e)
            {
                response = StatusCode(403, new { error = e.Message }); ;
            }

            // Return the response.
            return response;
        }
        [HttpPut("SubtractQuantityProduct")]
        public ActionResult<Product> SubtractQuantityProduct(string id, string amount)
        {
            ActionResult<Product> response;
            Product modified;
            try
            {
                // We aren't concerned with validation here. Only in BLL.
                modified = new AdminBLLController().SubtractQuantityFromProductByID(id, amount);
                // Encode our created object as JSON and bounce it back with the request.
                response = Ok(modified);
            }
            catch (InvalidOperationException)
            {
                response = StatusCode(403, new { error = $"No product was found with the ID of {id}." });
            }
            catch (Exception e)
            {
                response = StatusCode(403, new { error = e.Message }); ;
            }

            // Return the response.
            return response;
        }
        [HttpGet("ShowInventory")]
        public ActionResult<List<Product>> ShowInventory()
        {
            // TODO: Catch for unable to connect to database.
            // Return the response.
            return new AdminBLLController().GetProducts();
        }


        [HttpPatch("ModifyQuantity")]
        public ActionResult<Product> ModifyQuantity(string id, string op, string amount)
        {
            ActionResult<Product> response;

            op = op ?? "".Trim().ToLower();
            string[] validOps = { "add", "subtract" };
            if (!validOps.Contains(op))
            {
                response = UnprocessableEntity(new { error = "Invalid PATCH operation specified, choices are 'add' and 'subtract'." });
            }
            else
            {
                Product modified;
                try
                {
                    switch (op)
                    {
                        case "add":
                            modified = new AdminBLLController().AddQuantityToProductByID(id, amount);
                            response = Ok(modified);
                            break;
                        case "subtract":
                            modified = new AdminBLLController().SubtractQuantityFromProductByID(id, amount);
                            response = Ok(modified);
                            break;
                        default:
                            response = StatusCode(500);
                            break;
                    }
                }
                catch (InvalidOperationException)
                {
                    response = StatusCode(403, new { error = $"No product was found with the ID of {id}." });
                }
                catch (Exception e)
                {
                    response = StatusCode(403, new { error = e.Message }); ;
                }
            }


            // Return the response.
            return response;
        }
    }

}