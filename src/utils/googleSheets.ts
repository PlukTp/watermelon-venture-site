
/**
 * Utility function to submit form data to Google Sheets
 * Using the Google Sheets API with a pre-configured Google Apps Script Web App
 */

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp?: string;
}

/**
 * Submits form data to a Google Sheet through a Google Apps Script web app
 * 
 * @param formData The form data to submit
 * @param scriptUrl The deployed Google Apps Script web app URL
 * @returns Promise that resolves when the submission is complete
 */
export const submitToGoogleSheets = async (
  formData: ContactFormData,
  scriptUrl: string
): Promise<{ success: boolean; message: string }> => {
  if (!scriptUrl) {
    console.error("Google Script URL is not provided");
    return { 
      success: false, 
      message: "Google Script URL is missing. Please set up Google Sheets integration properly." 
    };
  }

  try {
    // Add timestamp
    const dataWithTimestamp = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors", // Required for Google Apps Script
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataWithTimestamp),
    });

    // Due to no-cors mode, we can't actually check the response status
    // So we assume success if no error was thrown
    return {
      success: true,
      message: "ข้อความของคุณถูกส่งเรียบร้อยแล้ว ขอบคุณที่ติดต่อเรา",
    };
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return {
      success: false,
      message: "เกิดข้อผิดพลาดในการส่งข้อความ โปรดลองอีกครั้งในภายหลัง",
    };
  }
};
