// renderer.js
class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        this.drawBezierCurve({x: 100, y: 250}, {x: 200, y: 50}, {x: 300, y: 250}, {x: 400, y: 75}, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        this.drawBezierCurve({x: 300, y: 500}, {x: 400, y: 300}, {x: 600, y: 440}, {x: 700, y: 300}, this.num_curve_sections, [0, 0, 255, 255], framebuffer);
        
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        this.drawCircle({x: 200, y: 200}, 100, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        this.drawCircle({x: 400, y: 400}, 150, this.num_curve_sections, [0, 0, 255, 255], framebuffer);

    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        let hexagon = [
            { x: 550, y: 150 },
            { x: 680, y: 200 },
            { x: 720, y: 340 },
            { x: 630, y: 440 },
            { x: 480, y: 420 },
            { x: 450, y: 260 }
        ];
        this.drawConvexPolygon(hexagon, [0, 128, 128, 255], framebuffer);

        let octagon = [
            { x: 200, y: 100 },
            { x: 300, y: 100 },
            { x: 400, y: 200 },
            { x: 400, y: 300 },
            { x: 300, y: 400 },
            { x: 200, y: 400 },
            { x: 100, y: 300 },
            { x: 100, y: 200 }
        ];
        this.drawConvexPolygon(octagon, [128, 0, 128, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        //Name: KHUÊ VO
        this.drawLine({x: 50, y: 50}, {x: 50, y: 150}, [255, 0, 0, 255], framebuffer); // Vertical line for 'K'
        this.drawLine({x: 50, y: 100}, {x: 100, y: 150}, [255, 0, 0, 255], framebuffer); // Top diagonal line for 'K'
        this.drawLine({x: 50, y: 100}, {x: 100, y: 50}, [255, 0, 0, 255], framebuffer); // Bottom diagonal line for 'K'

        this.drawLine({x: 150, y: 50}, {x: 150, y: 150}, [255, 0, 0, 255], framebuffer); // Left vertical line for 'H'
        this.drawLine({x: 200, y: 50}, {x: 200, y: 150}, [255, 0, 0, 255], framebuffer); // Right vertical line for 'H'
        this.drawLine({x: 150, y: 100}, {x: 200, y: 100}, [255, 0, 0, 255], framebuffer); // Horizontal line for 'H'

        this.drawLine({x: 250, y: 50}, {x: 250, y: 150}, [255, 0, 0, 255], framebuffer); // Left vertical line for 'U'
        this.drawLine({x: 300, y: 50}, {x: 300, y: 150}, [255, 0, 0, 255], framebuffer); // Right vertical line for 'U'
        this.drawBezierCurve({x: 250, y: 150}, {x: 300, y: 150}, [255, 0, 0, 255], framebuffer); // Bottom horizontal curve for 'U'

        this.drawLine({x: 350, y: 50}, {x: 400, y: 50}, [255, 0, 0, 255], framebuffer); // Top horizontal line for 'E'
        this.drawLine({x: 350, y: 100}, {x: 400, y: 100}, [255, 0, 0, 255], framebuffer); // Middle horizontal line for 'E'
        this.drawLine({x: 350, y: 150}, {x: 400, y: 150}, [255, 0, 0, 255], framebuffer); // Bottom horizontal line for 'E'
        this.drawLine({x: 350, y: 50}, {x: 350, y: 150}, [255, 0, 0, 255], framebuffer); // Left vertical line for 'E'
        this.drawTriangle({x: 350, y: 160}, {x: 400, y: 160}, {x: 375, y: 180}, [255, 0, 0, 255], framebuffer); // Top triangle for 'E'

        this.drawLine({x: 450, y: 150}, {x: 475, y: 50}, [255, 0, 0, 255], framebuffer); // Left vertical line for 'V'
        this.drawLine({x: 475, y: 50}, {x: 500, y: 150}, [255, 0, 0, 255], framebuffer); // Right vertical line for 'V'
        this.drawBezierCurve({x: 450, y: 150}, {x: 500, y: 150}, [255, 0, 0, 255], framebuffer); // Bottom horizontal curve for 'V'

        this.drawCircle({x: 550, y: 100}, 50, this.num_curve_sections, [255, 0, 0, 255], framebuffer); // Circle for 'O'
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        let prev_pt = { x: Math.round(p0.x), y: Math.round(p0.y) };

        for (let i = 1; i <= num_edges; i++) {
            let t = i / num_edges;
            let one_minus_t = 1 - t;

            // Cubic Bezier parametric formula
            let x = Math.round(
                Math.pow(one_minus_t, 3) * p0.x +
                3 * Math.pow(one_minus_t, 2) * t * p1.x +
                3 * one_minus_t * Math.pow(t, 2) * p2.x +
                Math.pow(t, 3) * p3.x
            );

            let y = Math.round(
                Math.pow(one_minus_t, 3) * p0.y +
                3 * Math.pow(one_minus_t, 2) * t * p1.y +
                3 * one_minus_t * Math.pow(t, 2) * p2.y +
                Math.pow(t, 3) * p3.y
            );

            let curr_pt = { x: x, y: y };
            this.drawLine(prev_pt, curr_pt, color, framebuffer);

            if (this.show_points) {
                this.drawVertex(prev_pt, [255, 255, 255, 255], framebuffer); // Render curve evaluation points
            }

            prev_pt = curr_pt;
        }

        if (this.show_points) {
            this.drawVertex(prev_pt, [255, 255, 255, 255], framebuffer);
            // Show control points p1 and p2 in a distinct color/style[cite: 1]
            this.drawVertex({ x: Math.round(p1.x), y: Math.round(p1.y) }, [255, 255, 0, 255], framebuffer);
            this.drawVertex({ x: Math.round(p2.x), y: Math.round(p2.y) }, [255, 255, 0, 255], framebuffer);
        }
    }
    

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle
        let vertices = [];
        let delta_angle = (2 * Math.PI) / num_edges;

        for (let i = 0; i < num_edges; i++) {
            let phi = i * delta_angle;
            // Polar to Cartesian coordinate conversion
            let x = Math.round(center.x + radius * Math.cos(phi));
            let y = Math.round(center.y + radius * Math.sin(phi));
            vertices.push({ x: x, y: y });
        }

        for (let i = 0; i < num_edges; i++) {
            let p0 = vertices[i];
            let p1 = vertices[(i + 1) % num_edges];
            this.drawLine(p0, p1, color, framebuffer);

            if (this.show_points) {
                this.drawVertex(p0, [255, 255, 255, 255], framebuffer); // Render circle vertices
            }
        }
        
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon
        if (vertex_list.length < 5) return;

        // Triangulate convex polygon using triangle fan from v0
        let v0 = vertex_list[0];
        for (let i = 1; i < vertex_list.length - 1; i++) {
            let v1 = vertex_list[i];
            let v2 = vertex_list[i + 1];
            this.drawTriangle(v0, v1, v2, color, framebuffer); // Draw filled triangle
        }

        if (this.show_points) {
            for (let v of vertex_list) {
                this.drawVertex(v, [255, 255, 255, 255], framebuffer); // Render polygon vertices
            }
        }
        
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`
        
        let radius = 2;
        for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
                let px = v.x + dx;
                let py = v.y + dy;
                if (px >= 0 && px < framebuffer.width && py >= 0 && py < framebuffer.height) {
                    this.setFramebufferColor(color, px, py, framebuffer);
                }
            }
        }
        
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(color, x, y, framebuffer) {
	    let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }
    
    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }
    
    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};

export { Renderer };
