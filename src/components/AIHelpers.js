import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyAxasVpc8FGsLOcToZB9yslD-X4-WtaAd4';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export const generateSuggestedInfo = async (cardData) => {
  const prompt = `Gợi ý một số thông tin bổ sung cho một tấm thiệp ${cardData.occasion} gửi cho ${cardData.relationship}. Thông tin này nên giúp làm cho lời chúc trở nên cá nhân hóa và ý nghĩa hơn. Đưa ra 3 gợi ý ngắn gọn.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating suggested info:', error);
    return '';
  }
};

export const generateMessage = async (cardData) => {
  const relationshipPrompts = {
    Family: "Hãy thể hiện tình cảm gia đình gắn bó, ấm áp.",
    Friend: "Nhấn mạnh vào kỷ niệm và sự quý mến giữa bạn bè.",
    Teacher: "Bày tỏ lòng biết ơn và kính trọng đối với người thầy.",
    Colleague: "Giữ giọng điệu chuyên nghiệp nhưng thân thiện.",
    Neighbor: "Thể hiện sự quan tâm và tinh thần cộng đồng."
  };

  const occasionPrompts = {
    Christmas: "Tập trung vào không khí lễ hội, niềm vui và hy vọng của mùa Giáng sinh.",
    "New Year": "Nhấn mạnh vào khởi đầu mới, ước mơ và mục tiêu cho năm tới.",
    Birthday: "Chúc mừng một cách đặc biệt, có thể đề cập đến kỷ niệm hoặc thành tựu cá nhân.",
    Anniversary: "Tôn vinh tình yêu, sự gắn bó và những khoảnh khắc đáng nhớ.",
    Graduation: "Chúc mừng thành tích học tập và bày tỏ niềm tin vào tương lai tươi sáng."
  };

  const prompt = `Tạo một lời chúc ${cardData.occasion} với các chi tiết sau:
    Chủ đề: ${cardData.theme}
    Mối quan hệ: ${cardData.relationship}
    Tên người nhận: ${cardData.recipientName}
    Tên người gửi: ${cardData.senderName}
    Dịp: ${cardData.occasion}
    Giọng điệu: ${cardData.tone}
    Thông tin bổ sung: ${cardData.additionalInfo}
    
    ${relationshipPrompts[cardData.relationship] || ''}
    ${occasionPrompts[cardData.occasion] || ''}
    
    Lời chúc phải bằng tiếng ${cardData.language} và phù hợp với chủ đề, mối quan hệ và dịp lễ. Hãy làm cho nó nghe tự nhiên và chân thành.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating message:', error);
    return '';
  }
};

