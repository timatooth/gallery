from PIL import Image
import glob
import os

package_directory = os.path.dirname(os.path.abspath(__file__))
cwd = os.path.realpath(os.path.join(package_directory, "../photos"))

def gen_thumbnails(thumbnail_size=(400, 400)):
    thumbdir = os.path.realpath(os.path.join(cwd, "../thumbnails"))
    if not os.path.exists(thumbdir):
        print "Thumbnails directory doesn't exist. Creating it."
        os.makedirs(thumbdir)
    

    for photofile in glob.glob(cwd + "/*.jpg"):
        base = os.path.basename(photofile)
        if os.path.isfile(os.path.join(thumbdir, base)):
            continue
        photo = Image.open(photofile)
        photo.thumbnail(thumbnail_size, Image.ANTIALIAS)
        photo.save(os.path.join(thumbdir, base), "JPEG")

if __name__ == "__main__":
    gen_thumbnails()
