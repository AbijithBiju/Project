import cv2
import os
import shutil


def video_splitter(path):
    # Open the video file
    video_path = path
    video = cv2.VideoCapture(video_path)

    # Define the frame rate and number of frames per chunk
    fps = video.get(cv2.CAP_PROP_FPS)
    chunk_size = 30

    # Create a directory to store the chunks
    shutil.rmtree('segments/')
    output_dir = 'segments'
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Initialize the frame counter
    frame_count = 0

    while True:
        # Read a frame from the video
        ret, frame = video.read()
        ret, frame = video.read()

        # If there are no more frames, break out of the loop
        if not ret:
            break

        # Save the current frame to a chunk file
        chunk_index = frame_count // chunk_size
        chunk_file = os.path.join(output_dir, f'{chunk_index:06d}.mp4')
        if frame_count % chunk_size == 0:
            writer = cv2.VideoWriter(chunk_file, cv2.VideoWriter_fourcc(*'mp4v'), fps, (frame.shape[1], frame.shape[0]))
        writer.write(frame)

        # Increment the frame counter
        frame_count += 1

        # Release the writer after writing all the frames in the chunk
        if frame_count % chunk_size == 0:
            writer.release()

    # Release the video object
    video.release()