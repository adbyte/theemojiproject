import React, { useRef } from 'react';
import EmojiCharacter from './EmojiCharacter';
import { Award, Download, Sparkles } from 'lucide-react';

interface CertificateProps {
  userName: string;
  onRestart: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ userName, onRestart }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    if (certificateRef.current) {
      // Simple implementation - in a real app, you'd use html2canvas or similar
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = 800;
        canvas.height = 600;
        
        // Create a gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#6366f1');
        gradient.addColorStop(1, '#8b5cf6');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add certificate content
        ctx.fillStyle = 'white';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Certificate of Achievement', canvas.width / 2, 120);
        
        ctx.font = '24px Arial';
        ctx.fillText('This certifies that', canvas.width / 2, 200);
        
        ctx.font = 'bold 36px Arial';
        ctx.fillText(userName, canvas.width / 2, 260);
        
        ctx.font = '24px Arial';
        ctx.fillText('has successfully completed', canvas.width / 2, 320);
        
        ctx.font = 'bold 32px Arial';
        ctx.fillText('The Emoj.I. Project', canvas.width / 2, 380);
        
        ctx.font = '20px Arial';
        ctx.fillText('Sentiment Analysis Training Program', canvas.width / 2, 420);
        
        ctx.font = '18px Arial';
        ctx.fillText('Official Emoj.I. Feelings Trainer', canvas.width / 2, 480);
        
        // Download the image
        const link = document.createElement('a');
        link.download = `${userName}-emoj-i-certificate.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 p-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        <div 
          ref={certificateRef}
          className="text-center border-4 border-purple-500 rounded-2xl p-8 bg-gradient-to-br from-blue-50 to-purple-50"
        >
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-2">
              <Award className="w-12 h-12 text-yellow-500" />
              Certificate of Achievement
              <Award className="w-12 h-12 text-yellow-500" />
            </h1>
          </div>

          <div className="mb-6">
            <EmojiCharacter 
              mood="excited" 
              size="large"
            />
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-xl text-gray-700">This certifies that</p>
            <h2 className="text-4xl font-bold text-purple-800">{userName}</h2>
            <p className="text-xl text-gray-700">has successfully completed</p>
            <h3 className="text-3xl font-bold text-blue-600 flex items-center justify-center gap-2">
              <Sparkles className="text-yellow-500" />
              The Emoj.I. Project
              <Sparkles className="text-yellow-500" />
            </h3>
            <p className="text-lg text-gray-600">Sentiment Analysis Training Program</p>
          </div>

          <div className="border-t-2 border-purple-300 pt-4">
            <p className="text-lg font-semibold text-purple-700">
              Official Emoj.I. Feelings Trainer
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Completed on {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-8 justify-center">
          <button
            onClick={downloadCertificate}
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Certificate
          </button>
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
          >
            Train Again!
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Thank you for helping Emoj.I. understand human feelings! 🤖❤️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;