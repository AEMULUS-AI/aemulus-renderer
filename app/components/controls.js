export default class Controls {
    constructor(canvas, window, camera) {
        this.canvas = canvas;
        this.window = window;
        this.camera = camera;
        // Rotation variables
        this.isMouseDown = false;
        this.isRightMouseDown = false;
        this.isMouseScroll = false;
        this.mouseX, this.mouseY;
        this.mouseStartX, this.mouseStartY;
        // Translation variables

        // Zoom variables
        this.deltaSum = 1;
        this.delta = 1;
        this.zoom_factor = 1.1;
        this.max_zoom = 11;

        // Rotation event handlers
        canvas.addEventListener('mousedown', (e) => {
            if (e.button == 2) {
                this.isRightMouseDown = true;
            }
            else if (e.button == 0) {
                this.isMouseDown = true;
            };
            const rect = canvas.getBoundingClientRect();
            this.mouseStartX = e.clientX - rect.left;
            this.mouseStartY = e.clientY - rect.top;
            this.mouseX = this.mouseStartX;
            this.mouseY = this.mouseStartY;
        });
        window.addEventListener('mousemove', (e) => {
            if (this.isMouseDown) {
                const rect = canvas.getBoundingClientRect();
                this.mouseX = e.clientX - rect.left;
                this.mouseY = e.clientY - rect.top;
            }
        })
        window.addEventListener('mouseup', () => {
            this.isMouseDown = false;
        });
    
        // Zoom event handlers
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.ctrlKey) {;
                this.delta = e.deltaY > 0 ? 1 / this.zoom_factor :this. zoom_factor;
                this.isMouseScroll = true;
            }
        });
    }

    update() {
        // rotate view matrix    
        if (this.isMouseDown || this.isRightMouseDown) {
            let dx = this.mouseX - this.mouseStartX;
            let dy = this.mouseY - this.mouseStartY;
            this.mouseStartX = this.mouseX;
            this.mouseStartY = this.mouseY;
            
            if (this.isMouseDown) {
                let angleX = dx / this.canvas.width * 4;   
                let angleY = dy / this.canvas.height * 4;
                this.camera.rotate(angleX, angleY);
            }
            else if (this.isRightMouseDown) {
                this.camera.translate(dx / 100, -dy / 100, 0);
            }
        }
        if (this.isMouseScroll) {
            this.deltaSum *= this.delta;
            if (this.deltaSum < this.max_zoom) {
                this.camera.zoom(Math.min(this.delta, this.max_zoom));
            }
            else {
                this.deltaSum = this.max_zoom;
            }
            this.delta = 1;
        }
    }
}
