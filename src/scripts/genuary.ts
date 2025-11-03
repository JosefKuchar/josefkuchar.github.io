import p5 from "p5";

var chunks: BlobPart[] = [];

const sketch = (p: p5) => {
  p.setup = () => {
    const parent = document.getElementById("app");
    const p5Canvas: any = p.createCanvas(1080, 1440).parent(parent!);
    const stream = p5Canvas.canvas.captureStream(60);
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    recorder.onstop = exportVideo;
    recorder.start();
    setTimeout(() => {
      recorder.stop();
    }, 5000);

    p.noStroke();
  };

  p.draw = () => {
    p.background(240);
    const x = p.width / 2 + Math.sin(p.frameCount * 0.05) * 100;
    p.fill(30);
    p.circle(x, p.height / 2, 50);
  };
};

const exportVideo = () => {
  const blob = new Blob(chunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "genuary2026_day1.webm";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};

new p5(sketch);
