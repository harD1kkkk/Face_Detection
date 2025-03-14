using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.CognitiveServices.Vision.Face;
using Microsoft.Azure.CognitiveServices.Vision.Face.Models;
using Microsoft.Extensions.Configuration;

namespace FaceDetectionApi.Services
{
    public class FaceService
    {
        private readonly IFaceClient _faceClient;

        public FaceService(IConfiguration configuration)
        {
            var endpoint = configuration["AzureFaceApi:Endpoint"];
            var subscriptionKey = configuration["AzureFaceApi:SubscriptionKey"];

            if (string.IsNullOrEmpty(endpoint) || string.IsNullOrEmpty(subscriptionKey))
            {
                throw new Exception("Azure Face API data not set in appsettings.json");
            }

            _faceClient = new FaceClient(new ApiKeyServiceClientCredentials(subscriptionKey))
            {
                Endpoint = endpoint
            };
        }

        public async Task<List<DetectedFace>> DetectFacesAsync(Stream imageStream)
        {
            var faceAttributes = new FaceAttributeType[]
            {
                FaceAttributeType.Age,
                FaceAttributeType.Gender,
                FaceAttributeType.Emotion
            };

            var detectedFaces = await _faceClient.Face.DetectWithStreamAsync(
                imageStream,
                returnFaceId: true,
                returnFaceLandmarks: false,
                returnFaceAttributes: faceAttributes
            );

            if (detectedFaces != null)
            {
                return detectedFaces.ToList();
            }
            else
            {
                return new List<DetectedFace>();
            }
        }
    }
}
