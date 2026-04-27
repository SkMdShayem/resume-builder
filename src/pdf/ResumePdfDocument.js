import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const THEME_CONFIG = {
  modern: {
    accent: "#0891b2",
    accentDark: "#0f172a",
    accentLight: "#ecfeff",
    headerText: "#ffffff",
    sidebar: false,
    sectionTitle: "uppercase",
  },
  minimal: {
    accent: "#1f2937",
    accentDark: "#111827",
    accentLight: "#f3f4f6",
    headerText: "#111827",
    sidebar: false,
    sectionTitle: "normal",
  },
  professional: {
    accent: "#0f172a",
    accentDark: "#020617",
    accentLight: "#e2e8f0",
    headerText: "#ffffff",
    sidebar: true,
    sectionTitle: "uppercase",
  },
  executive: {
    accent: "#312e81",
    accentDark: "#1e1b4b",
    accentLight: "#e0e7ff",
    headerText: "#ffffff",
    sidebar: true,
    sectionTitle: "uppercase",
  },
  creative: {
    accent: "#9a3412",
    accentDark: "#7c2d12",
    accentLight: "#ffedd5",
    headerText: "#ffffff",
    sidebar: true,
    sectionTitle: "uppercase",
  },
  academic: {
    accent: "#1d4ed8",
    accentDark: "#1e3a8a",
    accentLight: "#dbeafe",
    headerText: "#ffffff",
    sidebar: false,
    sectionTitle: "uppercase",
  },
  technical: {
    accent: "#0f766e",
    accentDark: "#134e4a",
    accentLight: "#ccfbf1",
    headerText: "#ffffff",
    sidebar: false,
    sectionTitle: "uppercase",
  },
  engineering: {
    accent: "#0f766e",
    accentDark: "#134e4a",
    accentLight: "#ccfbf1",
    headerText: "#ffffff",
    sidebar: false,
    sectionTitle: "uppercase",
  },
  classic: {
    accent: "#374151",
    accentDark: "#111827",
    accentLight: "#f3f4f6",
    headerText: "#111827",
    sidebar: false,
    sectionTitle: "uppercase",
  },
  "ats-optimized": {
    accent: "#111827",
    accentDark: "#111827",
    accentLight: "#f9fafb",
    headerText: "#111827",
    sidebar: false,
    sectionTitle: "uppercase",
  },
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1f2937",
    backgroundColor: "#ffffff",
    lineHeight: 1.5,
  },
  header: {
    padding: 28,
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
    fontSize: 9,
  },
  linkRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  linkPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 8,
  },
  content: {
    padding: 28,
    gap: 18,
  },
  twoColumnContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
  },
  mainColumn: {
    flex: 2,
    gap: 18,
  },
  sideColumn: {
    flex: 1,
    gap: 18,
  },
  sidebarWrap: {
    flexDirection: "row",
    flex: 1,
  },
  sidebar: {
    width: "31%",
    padding: 24,
    gap: 18,
  },
  sidebarMain: {
    width: "69%",
    padding: 28,
    gap: 20,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.1,
  },
  sectionTitleNormal: {
    textTransform: "none",
    letterSpacing: 0,
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  itemTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  itemSubtitle: {
    fontSize: 9,
    color: "#6b7280",
  },
  bodyText: {
    fontSize: 9.5,
    color: "#374151",
  },
  mutedText: {
    fontSize: 9,
    color: "#6b7280",
  },
  tagsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  list: {
    gap: 6,
  },
  listItem: {
    flexDirection: "row",
    gap: 6,
    alignItems: "flex-start",
  },
  bullet: {
    width: 8,
    fontSize: 10,
  },
  listText: {
    flex: 1,
    fontSize: 9.5,
  },
  sidebarName: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
  },
  sidebarSectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.1,
  },
  engineeringPage: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#0f172a",
    backgroundColor: "#020617",
    lineHeight: 1.5,
  },
  engineeringHeader: {
    backgroundColor: "#0f172a",
    paddingHorizontal: 30,
    paddingVertical: 26,
    borderBottomWidth: 1,
    borderBottomColor: "#164e63",
  },
  engineeringHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  engineeringHeaderMain: {
    flex: 1,
    gap: 8,
  },
  engineeringName: {
    fontSize: 27,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
  },
  engineeringContactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  engineeringContactText: {
    fontSize: 9,
    color: "#cbd5e1",
  },
  engineeringProfiles: {
    width: 170,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    padding: 12,
    gap: 8,
  },
  engineeringProfilesLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#67e8f9",
    letterSpacing: 1.1,
  },
  engineeringProfileCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    backgroundColor: "#0b1120",
    padding: 9,
    marginTop: 8,
  },
  engineeringProfileTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
  },
  engineeringProfileLink: {
    fontSize: 8,
    color: "#94a3b8",
    textDecoration: "none",
  },
  engineeringContent: {
    flexDirection: "row",
    gap: 18,
    paddingHorizontal: 24,
    paddingVertical: 22,
    backgroundColor: "#020617",
    flex: 1,
  },
  engineeringMain: {
    flex: 1.65,
    gap: 14,
  },
  engineeringAside: {
    flex: 0.9,
    gap: 14,
  },
  engineeringSurface: {
    borderRadius: 18,
    backgroundColor: "#ffffff",
    padding: 18,
    marginBottom: 14,
  },
  engineeringDarkSurface: {
    borderRadius: 18,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    padding: 16,
    marginBottom: 14,
  },
  engineeringSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 2,
  },
  engineeringSectionHeadText: {
    gap: 3,
  },
  engineeringEyebrow: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.3,
    color: "#0891b2",
  },
  engineeringEyebrowDark: {
    color: "#67e8f9",
  },
  engineeringSectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  engineeringSectionTitleDark: {
    color: "#f8fafc",
  },
  engineeringRule: {
    flex: 1,
    height: 1,
    backgroundColor: "#cbd5e1",
  },
  engineeringRuleDark: {
    backgroundColor: "#334155",
  },
  engineeringBody: {
    fontSize: 9.5,
    color: "#475569",
  },
  engineeringCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    padding: 14,
    marginTop: 10,
  },
  engineeringCardTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  engineeringCardSubtitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#0891b2",
  },
  engineeringCardBody: {
    fontSize: 9,
    color: "#475569",
    marginTop: 4,
  },
  engineeringTagsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  engineeringTag: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#164e63",
    backgroundColor: "#083344",
    paddingHorizontal: 9,
    paddingVertical: 4,
    fontSize: 8.5,
    color: "#cffafe",
    marginRight: 6,
    marginBottom: 6,
  },
  engineeringLanguageCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginTop: 8,
  },
  engineeringLanguageText: {
    fontSize: 9,
    color: "#e2e8f0",
  },
  engineeringRoleBadge: {
    alignSelf: "flex-start",
    marginTop: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#bae6fd",
    backgroundColor: "#ecfeff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: "#0e7490",
    letterSpacing: 0.8,
  },
});

const sanitizeUrl = (value = "") => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
};

const getTheme = (template) => THEME_CONFIG[template] || THEME_CONFIG.modern;

const renderSectionTitle = (title, theme, extraStyle = null) => (
  <Text
    style={[
      styles.sectionTitle,
      theme.sectionTitle === "normal" ? styles.sectionTitleNormal : null,
      extraStyle,
    ]}
  >
    {title}
  </Text>
);

const renderExperience = (experience, theme, useCards = true) => (
  experience.length ? (
    <View style={styles.section}>
      {renderSectionTitle("Experience", theme)}
      <View style={styles.list}>
        {experience.map((item, index) => (
          <View
            key={`experience-${index}`}
            style={useCards ? styles.card : null}
            wrap={false}
          >
            <Text style={styles.itemTitle}>{item.role || "Role"}</Text>
            {item.company ? (
              <Text style={styles.itemSubtitle}>{item.company}</Text>
            ) : null}
            {item.description ? (
              <Text style={styles.bodyText}>{item.description}</Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  ) : null
);

const renderEducation = (education, theme, useCards = true) => (
  education.length ? (
    <View style={styles.section}>
      {renderSectionTitle("Education", theme)}
      <View style={styles.list}>
        {education.map((item, index) => (
          <View
            key={`education-${index}`}
            style={useCards ? styles.card : null}
            wrap={false}
          >
            <Text style={styles.itemTitle}>{item.degree || "Degree"}</Text>
            {item.institution ? (
              <Text style={styles.itemSubtitle}>{item.institution}</Text>
            ) : null}
            {item.description ? (
              <Text style={styles.bodyText}>{item.description}</Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  ) : null
);

const renderPillsSection = (title, items, theme) => (
  items.length ? (
    <View style={styles.section}>
      {renderSectionTitle(title, theme)}
      <View style={styles.tagsWrap}>
        {items.map((item, index) => (
          <Text
            key={`${title}-${index}`}
            style={[
              styles.tag,
              {
                backgroundColor: theme.accentLight,
                color: theme.accentDark,
              },
            ]}
          >
            {item}
          </Text>
        ))}
      </View>
    </View>
  ) : null
);

const renderSidebarLinks = (links, theme) => {
  const entries = [
    ["LinkedIn", links.linkedin],
    ["GitHub", links.github],
    ["Portfolio", links.portfolio],
  ].filter(([, value]) => value);

  if (!entries.length) return null;

  return (
    <View style={styles.section}>
      {renderSectionTitle("Links", theme, styles.sidebarSectionTitle)}
      <View style={styles.list}>
        {entries.map(([label, value]) => (
          <Link
            key={label}
            src={sanitizeUrl(value)}
            style={{ fontSize: 9, color: "#e2e8f0", textDecoration: "none" }}
          >
            {label}: {value}
          </Link>
        ))}
      </View>
    </View>
  );
};

const renderEngineeringSectionHeader = (eyebrow, title, dark = false) => (
  <View style={styles.engineeringSectionHeader}>
    <View style={styles.engineeringSectionHeadText}>
      <Text
        style={[
          styles.engineeringEyebrow,
          dark ? styles.engineeringEyebrowDark : null,
        ]}
      >
        {eyebrow}
      </Text>
      <Text
        style={[
          styles.engineeringSectionTitle,
          dark ? styles.engineeringSectionTitleDark : null,
        ]}
      >
        {title}
      </Text>
    </View>
    <View
      style={[styles.engineeringRule, dark ? styles.engineeringRuleDark : null]}
    />
  </View>
);

const ResumePdfDocument = ({ resume = {}, template = "modern" }) => {
  const {
    personalInfo = {},
    links = {},
    summary = "",
    experience = [],
    education = [],
    skills = [],
    languages = [],
  } = resume;

  const theme = getTheme(template);
  const hasSummary = Boolean(summary?.trim());
  const hasExperience = experience.length > 0;
  const hasEducation = education.length > 0;
  const hasSkills = skills.length > 0;
  const hasLanguages = languages.length > 0;
  const hasMainColumnContent = hasSummary || hasExperience || hasEducation;
  const hasSideColumnContent = hasSkills || hasLanguages;
  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
  ].filter(Boolean);

  const linkEntries = [
    ["LinkedIn", links.linkedin],
    ["GitHub", links.github],
    ["Portfolio", links.portfolio],
  ].filter(([, value]) => value);

  if (template === "engineering" || template === "technical") {
    return (
      <Document
        title={`${personalInfo.name || "Resume"}.pdf`}
        author={personalInfo.name || "Resume Builder"}
      >
        <Page size="A4" style={styles.engineeringPage}>
          <View style={styles.engineeringHeader}>
            <View style={styles.engineeringHeaderRow}>
              <View style={styles.engineeringHeaderMain}>
                <Text style={styles.engineeringName}>{personalInfo.name || ""}</Text>
                {contactItems.length ? (
                  <View style={styles.engineeringContactRow}>
                    {contactItems.map((item, index) => (
                      <Text
                        key={`engineering-contact-${index}`}
                        style={styles.engineeringContactText}
                      >
                        {item}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>

              {linkEntries.length ? (
                <View style={styles.engineeringProfiles}>
                  <Text style={styles.engineeringProfilesLabel}>PROFILES</Text>
                  {linkEntries.map(([label, value]) => (
                    <View key={label} style={styles.engineeringProfileCard}>
                      <Text style={styles.engineeringProfileTitle}>{label}</Text>
                      <Link
                        src={sanitizeUrl(value)}
                        style={styles.engineeringProfileLink}
                      >
                        {value}
                      </Link>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.engineeringContent}>
            <View style={styles.engineeringMain}>
              {hasSummary ? (
                <View style={styles.engineeringSurface}>
                  {renderEngineeringSectionHeader("OVERVIEW", "Professional Summary")}
                  <Text style={styles.engineeringBody}>{summary}</Text>
                </View>
              ) : null}

              {hasExperience ? (
                <View style={styles.engineeringSurface}>
                  {renderEngineeringSectionHeader("BUILD", "Experience")}
                  <View style={styles.list}>
                    {experience.map((item, index) => (
                      <View
                        key={`engineering-experience-${index}`}
                        style={styles.engineeringCard}
                        wrap={false}
                      >
                        <Text style={styles.engineeringCardTitle}>
                          {item.role || "Role"}
                        </Text>
                        {item.company ? (
                          <Text style={styles.engineeringCardSubtitle}>
                            {item.company}
                          </Text>
                        ) : null}
                        <Text style={styles.engineeringRoleBadge}>ROLE</Text>
                        {item.description ? (
                          <Text style={styles.engineeringCardBody}>
                            {item.description}
                          </Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}

              {hasEducation ? (
                <View style={styles.engineeringSurface}>
                  {renderEngineeringSectionHeader("LEARN", "Education")}
                  <View style={styles.list}>
                    {education.map((item, index) => (
                      <View
                        key={`engineering-education-${index}`}
                        style={styles.engineeringCard}
                        wrap={false}
                      >
                        <Text style={styles.engineeringCardTitle}>
                          {item.degree || "Degree"}
                        </Text>
                        {item.institution ? (
                          <Text style={[styles.engineeringCardSubtitle, { color: "#64748b" }]}>
                            {item.institution}
                          </Text>
                        ) : null}
                        {item.description ? (
                          <Text style={styles.engineeringCardBody}>
                            {item.description}
                          </Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}
            </View>

            <View style={styles.engineeringAside}>
              {hasSkills ? (
                <View style={styles.engineeringDarkSurface}>
                  {renderEngineeringSectionHeader("STACK", "Skills", true)}
                  <View style={styles.engineeringTagsWrap}>
                    {skills.map((skill, index) => (
                      <Text key={`engineering-skill-${index}`} style={styles.engineeringTag}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              ) : null}

              {hasLanguages ? (
                <View style={styles.engineeringDarkSurface}>
                  {renderEngineeringSectionHeader("GLOBAL", "Languages", true)}
                  <View style={styles.list}>
                    {languages.map((language, index) => (
                      <View
                        key={`engineering-language-${index}`}
                        style={styles.engineeringLanguageCard}
                      >
                        <Text style={styles.engineeringLanguageText}>
                          {language}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  if (theme.sidebar) {
    return (
      <Document
        title={`${personalInfo.name || "Resume"}.pdf`}
        author={personalInfo.name || "Resume Builder"}
      >
        <Page size="A4" style={styles.page}>
          <View style={styles.sidebarWrap}>
            <View
              style={[
                styles.sidebar,
                { backgroundColor: theme.accent, color: "#ffffff" },
              ]}
            >
              <View style={styles.section}>
                <Text style={styles.sidebarName}>
                  {personalInfo.name || ""}
                </Text>
                {contactItems.length ? (
                  <View style={styles.list}>
                    {contactItems.map((item, index) => (
                      <Text
                        key={`contact-${index}`}
                        style={{ fontSize: 9, color: "#e2e8f0" }}
                      >
                        {item}
                      </Text>
                    ))}
                  </View>
                ) : (
                  <Text style={{ fontSize: 9, color: "#cbd5e1" }}>
                    Add your contact details in the form.
                  </Text>
                )}
              </View>

              {renderSidebarLinks(links, theme)}
              {renderPillsSection("Skills", skills, theme)}
              {renderPillsSection("Languages", languages, theme)}
            </View>

            <View style={styles.sidebarMain}>
              {hasSummary ? (
                <View style={styles.section}>
                  {renderSectionTitle("Professional Summary", theme)}
                  <Text style={styles.bodyText}>{summary}</Text>
                </View>
              ) : null}
              {hasSummary && (hasExperience || hasEducation) ? (
                <View style={styles.divider} />
              ) : null}
              {renderExperience(experience, theme)}
              {hasExperience && hasEducation ? <View style={styles.divider} /> : null}
              {renderEducation(education, theme)}
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document
      title={`${personalInfo.name || "Resume"}.pdf`}
      author={personalInfo.name || "Resume Builder"}
    >
      <Page size="A4" style={styles.page}>
        <View
          style={[
            styles.header,
            template === "minimal" || template === "classic" || template === "ats-optimized"
              ? { backgroundColor: "#ffffff" }
              : { backgroundColor: theme.accent },
          ]}
        >
          <Text
            style={[
              styles.name,
              {
                color:
                  template === "minimal" ||
                  template === "classic" ||
                  template === "ats-optimized"
                    ? theme.headerText
                    : "#ffffff",
              },
            ]}
          >
            {personalInfo.name || ""}
          </Text>

          {contactItems.length ? (
            <View
              style={[
                styles.contactRow,
                {
                  color:
                    template === "minimal" ||
                    template === "classic" ||
                    template === "ats-optimized"
                      ? "#4b5563"
                      : "#e0f2fe",
                },
              ]}
            >
              {contactItems.map((item, index) => (
                <Text key={`contact-${index}`}>{item}</Text>
              ))}
            </View>
          ) : null}

          {linkEntries.length ? (
            <View style={styles.linkRow}>
              {linkEntries.map(([label, value]) => (
                <Link
                  key={label}
                  src={sanitizeUrl(value)}
                  style={[
                    styles.linkPill,
                    {
                      backgroundColor:
                        template === "minimal" ||
                        template === "classic" ||
                        template === "ats-optimized"
                          ? theme.accentLight
                          : "rgba(255,255,255,0.18)",
                      color:
                        template === "minimal" ||
                        template === "classic" ||
                        template === "ats-optimized"
                          ? theme.accentDark
                          : "#ffffff",
                      textDecoration: "none",
                    },
                  ]}
                >
                  {label}
                </Link>
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.content}>
          {hasSummary ? (
            <View style={styles.section}>
              {renderSectionTitle(
                template === "minimal" ? "Summary" : "Professional Summary",
                theme,
              )}
              <Text style={styles.bodyText}>{summary}</Text>
            </View>
          ) : null}

          {hasMainColumnContent || hasSideColumnContent ? (
            <View style={styles.twoColumnContent}>
              <View style={styles.mainColumn}>
                {renderExperience(
                  experience,
                  theme,
                  template !== "classic" && template !== "ats-optimized",
                )}
                {renderEducation(
                  education,
                  theme,
                  template !== "classic" && template !== "ats-optimized",
                )}
              </View>

              <View style={styles.sideColumn}>
                {renderPillsSection("Skills", skills, theme)}
                {renderPillsSection("Languages", languages, theme)}
              </View>
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
};

export default ResumePdfDocument;
