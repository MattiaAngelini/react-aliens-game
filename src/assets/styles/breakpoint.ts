export function currentWindow(width: number): string {
    let size = '';
    if (width < 300) {
        size = 'xxs';
    } else if (width >= 300 && width < 576) {
        size = 'xs';
    } else if (width >= 576 && width < 768) {
        size = 'sm';
    } else if (width >= 768 && width < 992) {
        size = 'md';
    } else if (width >= 992 && width < 1200) {
        size = 'lg';
    } else if (width >= 1200 && width < 1400) {
        size = 'xl';
    } else if (width > 1400) {
        size = 'xxl';
    }
    return size;
}