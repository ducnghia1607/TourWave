export class StringUtility {
  private static readonly VietnameseSigns: string[] = [
    'aAeEoOuUiIdDyY',
    'áàạảãâấầậẩẫăắằặẳẵ',
    'ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ',
    'éèẹẻẽêếềệểễ',
    'ÉÈẸẺẼÊẾỀỆỂỄ',
    'óòọỏõôốồộổỗơớờợởỡ',
    'ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ',
    'úùụủũưứừựửữ',
    'ÚÙỤỦŨƯỨỪỰỬỮ',
    'íìịỉĩ',
    'ÍÌỊỈĨ',
    'đ',
    'Đ',
    'ýỳỵỷỹ',
    'ÝỲỴỶỸ',
  ];

  public static removeSign4VietnameseString(str: string): string {
    for (let i = 1; i < this.VietnameseSigns.length; i++) {
      for (let j = 0; j < this.VietnameseSigns[i].length; j++) {
        str = str.replace(
          new RegExp(this.VietnameseSigns[i][j], 'g'),
          this.VietnameseSigns[0][i - 1]
        );
      }
    }

    let result = str.replace(/[^a-zA-Z0-9\s]/g, '');
    result = result.replace(/\s+/g, '-');
    result = result.trim();
    result = result.toLowerCase();
    return result;
  }

  public static removeVietnameseSign(vietnamString: string): string {
    const strFormD = vietnamString.normalize('NFD');
    const str = strFormD
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
    let result = str.replace(/[^a-zA-Z0-9\s]/g, '');
    result = result.replace(/\s+/g, '-');
    result = result.trim();
    result = result.toLowerCase();
    return result;
  }

  public static getDayOfTour(duration: string) {
    const day = duration.trim();
    if (duration == 'Trong ngày') return 0;
    for (let i = 0; i < day.length; i++) {
      if (isNaN(parseInt(day[i], 10))) {
        return parseInt(day.substring(0, i), 10);
      }
    }
    return -1;
  }
}
