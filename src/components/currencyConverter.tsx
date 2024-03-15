export default function convertToMillions(number: number | string): string {
    let num: number;
    
    if (typeof number === 'string') {
        num = parseFloat(number);
        
        if (isNaN(num)) {
            return 'Invalid input. Please provide a valid number.';
        }
    } else if (typeof number !== 'number') {
        return 'Invalid input. Please provide a number.';
    } else {
        num = number;
    }
 
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + 'K';
    } else {
        return num.toString();
    }
}