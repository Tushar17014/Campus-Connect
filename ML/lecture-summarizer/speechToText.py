import os
os.environ["HF_HOME"] = "D:\Projects\Campus Connect\ML\lecture-summarizer\cache"
os.environ["TORCH_HOME"] = "D:\Projects\Campus Connect\ML\lecture-summarizer\cache\Torch_cache"

import torch
torch.backends.cuda.matmul.allow_tf32 = True
torch.backends.cudnn.allow_tf32 = True

import whisperx
device = "cpu"
model = whisperx.load_model("large-v2", device=device, compute_type="int8")

def convertSpeechToText(audio_path):
    result = model.transcribe(audio_path)
    return result

# audio_path = "D:\Projects\Campus Connect\ML\lecture-summarizer\data\speech5.mp3"

