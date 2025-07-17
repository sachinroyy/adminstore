// Load a script dynamically
export function loadScript(src) {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      console.log(`Script loaded: ${src}`);
      resolve();
    };
    script.onerror = (error) => {
      console.error(`Error loading script: ${src}`, error);
      reject(new Error(`Failed to load script: ${src}`));
    };
    document.body.appendChild(script);
  });
}
