#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

fn main() {
    // Start Node backend automatically
    Command::new("cmd")
        .args(&["/C", "node server.js"])
        .current_dir("..") // PROJECT root
        .spawn()
        .expect("Failed to start backend");

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
