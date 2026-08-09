# Good First Issues — Bonus Task Submission

This folder documents open-source contributions submitted to the repository **[Roots26Hz/Glint](https://github.com/Roots26Hz/Glint)**, a macOS notch audio visualizer application written in Swift/SwiftUI.

---

## Documented Issues

### 1. Issue #3 — High Priority Fix Plan: Unblocking Local & CI Builds (Missing Core Source Definitions)
- **Repository**: [Roots26Hz/Glint](https://github.com/Roots26Hz/Glint)
- **Issue Link**: [https://github.com/Roots26Hz/Glint/issues/3](https://github.com/Roots26Hz/Glint/issues/3)
- **Scope**: Build & Compilation Fix / Missing Core Type Definitions

#### Summary of the Issue
The `Glint` macOS application was failing during the build step (`xcodebuild`) due to missing core source definitions in scope. Several key UI views and view models referenced Swift types (`MusicPlayerService`, `ColorPalette`, `VisualizerSettings`, `VisualizerStudioView`) that were referenced across `GlintApp.swift`, `NotchViewModel.swift`, and `ExpandedMusicView.swift` but had no underlying file definitions in the project tree.

#### Key Contributions & Proposed Solutions
1. **Root Cause Analysis**: Identified 8 missing symbols blocking local compilation and CI/CD pipelines.
2. **API Contract Reconstruction**: Defined exact property contracts and type specifications needed across `ColorPalette`, `MusicPlayerService`, `VisualizerTypes`, and `VisualizerStudioView`.
3. **Implementation Blueprint**: Provided full Swift implementation files (`ColorPalette.swift`, `MusicPlayerService.swift`, `VisualizerTypes.swift`, `VisualizerStudioView.swift`) to resolve `xcodebuild` compilation errors.
4. **Build Verification**: Outlined validation steps using `xcodegen` and `xcodebuild` to achieve a clean build (exit code 0).

---

### 2. Issue #4 — Fix Plan: Resolving Privacy Permission Misalignment (Screen Recording vs. Audio Capture)
- **Repository**: [Roots26Hz/Glint](https://github.com/Roots26Hz/Glint)
- **Issue Link**: [https://github.com/Roots26Hz/Glint/issues/4](https://github.com/Roots26Hz/Glint/issues/4)
- **Scope**: Security, Privacy & macOS TCC Authorization

#### Summary of the Issue
Glint invoked `CGRequestScreenCaptureAccess()` inside `AudioSpectrumAnalyzer.swift` to set up CoreAudio process taps. This triggered a macOS prompt for **Screen Recording** (full desktop video capture), creating a severe user trust issue since the app documentation only requested audio capture permissions.

#### Key Contributions & Proposed Solutions
1. **Discrepancy Matrix**: Documented the mismatch between the code calling `CGRequestScreenCaptureAccess()` and `Info.plist` declaring `NSAudioCaptureUsageDescription`.
2. **Path A (Pure CoreAudio Flow)**: Removed `CGRequestScreenCaptureAccess()` to rely on native CoreAudio process tap authorization without triggering video recording popups.
3. **Path B (Dual Permission & Disclosure)**: Provided `NSScreenCaptureUsageDescription` strings for `project.yml` and `Info.plist` with updated user onboarding matrix.
4. **TCC Verification Protocol**: Created `tccutil reset` commands to test permission prompts, denial fallbacks, and real audio spectrum animation.

---

## Open Source Triage Learnings

- Gained hands-on experience performing static analysis on open-source codebases to trace missing dependency graphs.
- Understood how missing types break Swift/Xcode compilation and CI build pipelines.
- Learned macOS TCC (Transparency, Consent, and Control) security mechanisms and how to resolve privacy permission misalignments between code and `Info.plist`.
- Practiced writing comprehensive, developer-ready issue reports with clear action items and solution blueprints.
