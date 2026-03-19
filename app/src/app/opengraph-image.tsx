import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Διατροφή — Εβδομαδιαίο Πρόγραμμα Μεσογειακής Διατροφής";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const notoSerifSemibold = await fetch(
    "https://fonts.gstatic.com/s/notoserif/v33/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZdlejwA.ttf"
  ).then((res) => res.arrayBuffer());

  const notoSans = await fetch(
    "https://fonts.gstatic.com/s/notosans/v42/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A99d.ttf"
  ).then((res) => res.arrayBuffer());

  const notoSansBold = await fetch(
    "https://fonts.gstatic.com/s/notosans/v42/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyAaBN9d.ttf"
  ).then((res) => res.arrayBuffer());

  const days = ["Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ", "Κυρ"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          // Matches app: bg-gradient-to-br from-teal-100 to-green-200
          background: "linear-gradient(135deg, #ccfbf1 0%, #bbf7d0 100%)",
        }}
      >
        {/* Subtle radial glow for depth */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-50px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 50%)",
            display: "flex",
          }}
        />

        {/* Main content — asymmetric split */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "60px 80px",
          }}
        >
          {/* Left column — title & info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              paddingRight: "40px",
            }}
          >
            {/* Overline — matches app's emerald-600 to teal-400 gradient feel */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "2px",
                  background: "#059669",
                  borderRadius: "1px",
                  display: "flex",
                }}
              />
              <span
                style={{
                  fontFamily: "'Noto Sans'",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#059669",
                  letterSpacing: "3px",
                }}
              >
                ΜΕΣΟΓΕΙΑΚΗ ΔΙΑΤΡΟΦΗ
              </span>
            </div>

            {/* Title — emerald-700 like app headings */}
            <div
              style={{
                fontFamily: "'Noto Serif'",
                fontSize: "74px",
                fontWeight: 600,
                color: "#047857",
                lineHeight: 1,
                marginBottom: "12px",
              }}
            >
              Διατροφή
            </div>

            {/* Accent line — emerald-600 to teal-400 gradient (matches table headers) */}
            <div
              style={{
                width: "72px",
                height: "3px",
                background: "linear-gradient(90deg, #059669, #2dd4bf)",
                borderRadius: "2px",
                marginBottom: "24px",
                display: "flex",
              }}
            />

            {/* Subtitle — tinted emerald-gray for contrast on mint background */}
            <div
              style={{
                fontFamily: "'Noto Sans'",
                fontSize: "21px",
                fontWeight: 400,
                color: "#3d5a50",
                lineHeight: 1.5,
                maxWidth: "440px",
              }}
            >
              Εξατομικευμένο εβδομαδιαίο πρόγραμμα διατροφής με αυτόματη
              παρακολούθηση μακροθρεπτικών
            </div>

            {/* Macro indicators — colors match DailyProgress bars */}
            <div
              style={{
                display: "flex",
                gap: "6px",
                marginTop: "36px",
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Θερμίδες", color: "#10b981" },
                { label: "Πρωτεΐνη", color: "#60a5fa" },
                { label: "Υδατάνθρακες", color: "#c084fc" },
                { label: "Λιπαρά", color: "#fb923c" },
                { label: "Ίνες", color: "#f59e0b" },
              ].map((m) => (
                <div
                  key={m.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(255,255,255,0.55)",
                    borderRadius: "8px",
                    padding: "6px 12px",
                  }}
                >
                  <div
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "4px",
                      background: m.color,
                      display: "flex",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Noto Sans'",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#334155",
                    }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — weekly schedule preview in a white card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
              width: "360px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: "white",
                borderRadius: "16px",
                padding: "24px 28px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                border: "1px solid rgba(226,232,240,0.8)",
                width: "100%",
              }}
            >
              {/* Card header — matches app's emerald-to-teal gradient headers */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "20px",
                  paddingBottom: "14px",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #059669, #2dd4bf)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>🗓</span>
                </div>
                <span
                  style={{
                    fontFamily: "'Noto Sans'",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#334155",
                    letterSpacing: "0.5px",
                  }}
                >
                  Εβδομαδιαίο Πλάνο
                </span>
              </div>

              {/* Day rows */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {days.map((day, i) => {
                  const widths = [200, 260, 220, 280, 240, 180, 160];
                  const isToday = i === 2;
                  return (
                    <div
                      key={day}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "4px 0",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Noto Sans'",
                          fontSize: "12px",
                          color: isToday ? "#059669" : "#64748b",
                          fontWeight: isToday ? 700 : 400,
                          letterSpacing: "1px",
                          width: "32px",
                          textAlign: "right",
                        }}
                      >
                        {day}
                      </span>
                      <div
                        style={{
                          height: "22px",
                          flex: 1,
                          maxWidth: `${widths[i]}px`,
                          borderRadius: "6px",
                          display: "flex",
                          overflow: "hidden",
                        }}
                      >
                        {/* Breakfast — emerald */}
                        <div
                          style={{
                            flex: 2,
                            background: isToday
                              ? "rgba(16,185,129,0.45)"
                              : "rgba(16,185,129,0.2)",
                            display: "flex",
                          }}
                        />
                        <div
                          style={{
                            width: "1px",
                            background: "white",
                            display: "flex",
                          }}
                        />
                        {/* Lunch — teal */}
                        <div
                          style={{
                            flex: 3.5,
                            background: isToday
                              ? "rgba(45,212,191,0.45)"
                              : "rgba(45,212,191,0.22)",
                            display: "flex",
                          }}
                        />
                        <div
                          style={{
                            width: "1px",
                            background: "white",
                            display: "flex",
                          }}
                        />
                        {/* Dinner — emerald lighter */}
                        <div
                          style={{
                            flex: 3,
                            background: isToday
                              ? "rgba(16,185,129,0.35)"
                              : "rgba(16,185,129,0.15)",
                            display: "flex",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  marginTop: "16px",
                  paddingTop: "12px",
                  borderTop: "1px solid #f1f5f9",
                }}
              >
                {[
                  { label: "Πρωινό", color: "rgba(16,185,129,0.5)" },
                  { label: "Μεσημεριανό", color: "rgba(45,212,191,0.5)" },
                  { label: "Βραδινό", color: "rgba(16,185,129,0.3)" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "3px",
                        background: item.color,
                        display: "flex",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Noto Sans'",
                        fontSize: "10px",
                        color: "#64748b",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Serif",
          data: notoSerifSemibold,
          weight: 600,
          style: "normal",
        },
        {
          name: "Noto Sans",
          data: notoSans,
          weight: 400,
          style: "normal",
        },
        {
          name: "Noto Sans",
          data: notoSansBold,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
