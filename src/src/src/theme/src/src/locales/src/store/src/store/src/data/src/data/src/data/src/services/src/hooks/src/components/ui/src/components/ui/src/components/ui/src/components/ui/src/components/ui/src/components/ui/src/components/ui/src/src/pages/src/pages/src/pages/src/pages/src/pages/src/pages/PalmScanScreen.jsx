import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Webcam from 'react-webcam';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Header from '../components/ui/Header';
import { fadeInUp } from '../theme/animations';
import { Camera, Upload, Hand, ArrowLeft } from 'lucide-react';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

export default function PalmScanScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [handSide, setHandSide] = useState(null); // 'left' | 'right' | null
  const [imageSrc, setImageSrc] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const webcamRef = React.useRef(null);

  const capture = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
    setShowCamera(false);
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  const proceedToResult = () => {
    if (imageSrc) {
      navigate('/palm/result', { 
        state: { 
          image: imageSrc, 
          hand: handSide === 'left' ? t('palm.left_hand') : t('palm.right_hand')
        }
      });
    }
  };

  // Reset flow
  const reset = () => {
    setHandSide(null);
    setImageSrc(null);
    setShowCamera(false);
  };

  return (
    <>
      <Header title={t('palm.scan_title')} />

      <div className="px-6 pb-24">

        {/* Step 1: Choose Hand */}
        {!handSide && !imageSrc && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            className="max-w-md mx-auto mt-10"
          >
            <h2 className="text-3xl font-bold text-center text-gradient mb-12">
              Which hand would you like to scan?
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <GlassCard
                glow="blue"
                padding="p-10"
                onClick={() => setHandSide('left')}
                className="text-center"
              >
                <Hand className="w-24 h-24 mx-auto mb-6 text-neon-blue" strokeWidth={1.5} />
                <p className="text-2xl font-bold text-neon-blue">Left Hand</p>
                <p className="text-sm text-gray-300 mt-2">Inner Self • Emotions • Past</p>
              </GlassCard>

              <GlassCard
                glow="purple"
                padding="p-10"
                onClick={() => setHandSide('right')}
                className="text-center"
              >
                <Hand className="w-24 h-24 mx-auto mb-6 text-neon-purple scale-x-[-1]" strokeWidth={1.5} />
                <p className="text-2xl font-bold text-neon-purple">Right Hand</p>
                <p className="text-sm text-gray-300 mt-2">Outer Life • Future • Action</p>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {/* Step 2: Capture or Upload */}
        {handSide && !imageSrc && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            className="max-w-lg mx-auto mt-8"
          >
            <h2 className="text-3xl font-bold text-center text-gradient mb-8">
              {handSide === 'left' ? t('palm.left_hand') : t('palm.right_hand')}
            </h2>

            <div className="space-y-6">
              {/* Live Camera Option */}
              <GlassCard
                glow="blue"
                padding="p-8"
                onClick={() => setShowCamera(true)}
                className="text-center"
              >
                <Camera className="w-16 h-16 mx-auto mb-4 text-neon-blue" />
                <p className="text-xl font-semibold">Take Photo</p>
                <p className="text-gray-400">Use your camera</p>
              </GlassCard>

              {/* Upload Option */}
              <div
                {...getRootProps()}
                className="cursor-pointer"
              >
                <GlassCard
                  glow="purple"
                  padding="p-8"
                  className="text-center border-2 border-dashed border-white/30"
                >
                  <input {...getInputProps()} />
                  <Upload className="w-16 h-16 mx-auto mb-4 text-neon-purple" />
                  <p className="text-xl font-semibold">
                    {isDragActive ? "Drop here" : "Upload Photo"}
                  </p>
                  <p className="text-gray-400">or drag & drop</p>
                </GlassCard>
              </div>
            </div>

            <Button variant="ghost" size="lg" fullWidth onClick={reset} className="mt-8">
              <ArrowLeft className="w-5 h-5 mr-2" /> Change Hand
            </Button>
          </motion.div>
        )}

        {/* Camera View */}
        {showCamera && !imageSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-full object-cover"
            />

            {/* Palm Guide Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-96 border-4 border-neon-blue/70 rounded-3xl shadow-neon-blue" />
              <p className="absolute bottom-32 text-white text-xl font-bold bg-black/50 px-6 py-3 rounded-full">
                Align your palm inside the frame
              </p>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-8">
              <button
                onClick={() => setShowCamera(false)}
                className="p-6 rounded-full bg-white/20 backdrop-blur-xl"
              >
                Cancel
              </button>
              <button
                onClick={capture}
                className="p-8 rounded-full bg-neon-blue shadow-neon-blue"
              >
                <div className="w-20 h-20 bg-white rounded-full" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Preview & Confirm */}
        {imageSrc && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            className="max-w-lg mx-auto mt-8"
          >
            <h2 className="text-3xl font-bold text-center text-gradient mb-8">
              Ready for Analysis
            </h2>

            <GlassCard glow="purple" padding="p-4">
              <img
                src={imageSrc}
                alt="Your palm"
                className="w-full rounded-3xl"
              />
            </GlassCard>

            <div className="flex gap-4 mt-8">
              <Button variant="secondary" size="lg" fullWidth onClick={reset}>
                Retake
              </Button>
              <Button variant="primary" size="lg" fullWidth onClick={proceedToResult}>
                Analyze Palm
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
