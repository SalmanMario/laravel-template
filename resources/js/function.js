export function initWelcomePage() {
    console.log('Welcome page loaded');

    const el = document.querySelector('#title');
    if (el) el.textContent = 'Am intrat pe pagină!';
}

