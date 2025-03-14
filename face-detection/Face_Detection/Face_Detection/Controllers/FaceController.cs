using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using FaceDetectionApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.Vision.Face;

namespace FaceDetectionApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FaceController : ControllerBase
    {
        private readonly FaceService _faceService;

        public FaceController(FaceService faceService)
        {
            _faceService = faceService;
        }

        [HttpPost("detect")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> DetectFaces(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Please upload an image file");
            }

            using (var stream = file.OpenReadStream())
            {
                var faces = await _faceService.DetectFacesAsync(stream);
                var result = new List<object>();

                foreach (var face in faces)
                {
                    result.Add(new
                    {
                        FaceId = face.FaceId,
                        Age = face.FaceAttributes.Age,
                        Gender = face.FaceAttributes.Gender.ToString(),
                        Emotions = face.FaceAttributes.Emotion.ToRankedList()
                    });
                }

                return Ok(result);
            }
        }
    }
}
