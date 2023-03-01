import Hitbox from "./hitbox.js";
import { context } from "./screen.js";

var draws = [];

export default class Draw {
    static line(x1, y1, x2, y2, color = "black", width = 1) {
        let linePrototype = {type: "line", x1, y1, x2, y2, color, width, visible: true };
        // Instances
        linePrototype.hitbox = new Hitbox("line", this);
        draws.push(linePrototype);
        return draws[draws.length - 1];
    }

    static strokeRect(x, y, width, height, color = "black", lineWidth = 1) {
        draws.push({type: "strokeRect", x, y, width, height, color, lineWidth });
        return draws[draws.length - 1];
    }

    static fillRect(x, y, width, height, color = "black") {
        draws.push({type: "fillRect", x, y, width, height, color });
        return draws[draws.length - 1];
    }

    static strokeCircle(x, y, radius, color = "black", lineWidth = 1) {
        draws.push({type: "strokeCircle", x, y, radius, color, lineWidth });
        return draws[draws.length - 1];
    }

    static fillCircle(x, y, radius, color = "black") {
        draws.push({type: "fillCircle", x, y, radius, color });
        return draws[draws.length - 1];
    }

    static strokeEllipse(x, y, radiusX, radiusY, rotation, color = "black", lineWidth = 1, startAngle = 0, endAngle = 2 * Math.PI) {
        draws.push({type: "strokeEllipse", x, y, radiusX, radiusY, rotation, startAngle, endAngle, color, lineWidth });
        return draws[draws.length - 1];
    }

    static fillEllipse(x, y, radiusX, radiusY, rotation, color = "black", startAngle = 0, endAngle = 2 * Math.PI) {
        draws.push({type: "fillEllipse", x, y, radiusX, radiusY, rotation, color, startAngle, endAngle,  });
        return draws[draws.length - 1];
    }

    static strokePolygon(x, y, radius, sides, rotation, color = "black", lineWidth = 1) {
        draws.push({type: "strokePolygon", x, y, radius, sides, rotation, color, lineWidth });
        return draws[draws.length - 1];
    }

    static fillPolygon(x, y, radius, sides, rotation, color = "black") {
        draws.push({type: "fillPolygon", x, y, radius, sides, rotation, color });
        return draws[draws.length - 1];
    }

    static strokeQuadraticCurve(x1, y1, x2, y2, x3, y3, color = "black", lineWidth = 1) {
        draws.push({type: "strokeQuadraticCurve", x1, y1, x2, y2, x3, y3, color, lineWidth });
        return draws[draws.length - 1];
    }

    static fillQuadraticCurve(x1, y1, x2, y2, x3, y3, color = "black") {
        draws.push({type: "fillQuadraticCurve", x1, y1, x2, y2, x3, y3, color });
        return draws[draws.length - 1];
    }

    static strokeBezierCurve(x1, y1, x2, y2, x3, y3, x4, y4, color = "black", lineWidth = 1) {
        draws.push({type: "strokeBezierCurve", x1, y1, x2, y2, x3, y3, x4, y4, color, lineWidth });
        return draws[draws.length - 1];
    }

    static fillBezierCurve(x1, y1, x2, y2, x3, y3, x4, y4, color = "black") {
        draws.push({type: "fillBezierCurve", x1, y1, x2, y2, x3, y3, x4, y4, color });
        return draws[draws.length - 1];
    }
}

export function renderDraws() {
    draws.forEach(draw => {
        if (draw.type == "line") {
            context.strokeStyle = draw.color;
            context.lineWidth = draw.width;
            context.beginPath();
            context.moveTo(draw.x1, draw.y1);
            context.lineTo(draw.x2, draw.y2);
            context.stroke();
            context.closePath();
            return;
        }

        if (draw.type == "strokeRect") {
            context.strokeStyle = draw.color;
            context.lineWidth = draw.lineWidth;
            context.strokeRect(draw.x, draw.y, draw.width, draw.height);
            return;
        }

        if (draw.type == "fillRect") {
            context.fillStyle = draw.color;
            context.fillRect(draw.x, draw.y, draw.width, draw.height);
            return;
        }

        if (draw.type == "strokeCircle") {
            context.strokeStyle = draw.color;
            context.lineWidth = draw.lineWidth;
            context.beginPath();
            context.arc(draw.x, draw.y, draw.radius, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
            return;
        }

        if (draw.type == "fillCircle") {
            context.fillStyle = draw.color;
            context.beginPath();
            context.arc(draw.x, draw.y, draw.radius, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
            return;
        }

        if (draw.type == "strokeEllipse") {
            context.strokeStyle = draw.color;
            context.lineWidth = draw.lineWidth;
            context.beginPath();
            context.ellipse(draw.x, draw.y, Math.abs(draw.radiusX), Math.abs(draw.radiusY), draw.rotation, draw.startAngle, draw.endAngle);
            context.stroke();
            context.closePath();
            return;
        }

        if (draw.type == "fillEllipse") {
            context.fillStyle = draw.color;
            context.beginPath();
            context.ellipse(draw.x, draw.y, Math.abs(draw.radiusX), Math.abs(draw.radiusY), draw.rotation, draw.startAngle, draw.endAngle);
            context.fill();
            context.closePath();
            return;
        }

        if (draw.type == "strokePolygon") {
            context.strokeStyle = draw.color;
            context.lineWidth = draw.lineWidth;
            context.beginPath();
            context.moveTo(draw.x + draw.radius * Math.cos(0), draw.y + draw.radius * Math.sin(0));
            for (let i = 1; i <= draw.sides; i++) {
                context.lineTo(draw.x + draw.radius * Math.cos(i * 2 * Math.PI / draw.sides), draw.y + draw.radius * Math.sin(i * 2 * Math.PI / draw.sides));
            }
            context.closePath();
            context.stroke();
            return;
        }

        if (draw.type == "fillPolygon") {
            context.fillStyle = draw.color;
            context.save();
            // Rotate the polygon with draw.rotation
            context.translate(draw.x, draw.y);
            context.rotate(draw.rotation);
            context.translate(-draw.x, -draw.y);
            context.beginPath();
            context.moveTo(draw.x + draw.radius * Math.cos(0), draw.y + draw.radius * Math.sin(0));
            for (let i = 1; i <= draw.sides; i++) {
                context.lineTo(draw.x + draw.radius * Math.cos(i * 2 * Math.PI / draw.sides), draw.y + draw.radius * Math.sin(i * 2 * Math.PI / draw.sides));
            }
            context.closePath();
            context.fill();
            context.restore();
            return;
        }

        if (draw.type == "strokeQuadraticCurve") {
            context.strokeStyle = draw.color;
            context.lineWidth = draw.lineWidth;
            context.beginPath();
            context.moveTo(draw.x1, draw.y1);
            context.quadraticCurveTo(draw.x2, draw.y2, draw.x3, draw.y3);
            context.stroke();
            context.closePath();
            return;
        }

        if (draw.type == "fillQuadraticCurve") {
            context.fillStyle = draw.color;
            context.beginPath();
            context.moveTo(draw.x1, draw.y1);
            context.quadraticCurveTo(draw.x2, draw.y2, draw.x3, draw.y3);
            context.fill();
            context.closePath();
            return;
        }

        if (draw.type == "strokeBezierCurve") {
            context.strokeStyle = draw.color;
            context.lineWidth = draw.lineWidth;
            context.beginPath();
            context.moveTo(draw.x1, draw.y1);
            context.bezierCurveTo(draw.x2, draw.y2, draw.x3, draw.y3, draw.x4, draw.y4);
            context.stroke();
            context.closePath();
            return;
        }

        if (draw.type == "fillBezierCurve") {
            context.fillStyle = draw.color;
            context.beginPath();
            context.moveTo(draw.x1, draw.y1);
            context.bezierCurveTo(draw.x2, draw.y2, draw.x3, draw.y3, draw.x4, draw.y4);
            context.fill();
            context.closePath();
            return;
        }             
    });   
}